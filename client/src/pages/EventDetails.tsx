import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/events/${id}`);
                setEvent(res.data);

                // Check if registered
                if (localStorage.getItem('token')) {
                    try {
                        const regRes = await api.get(`/registrations/check/${id}`);
                        setIsRegistered(regRes.data.isRegistered);
                    } catch (err) {
                        console.error("Failed to check registration", err);
                    }
                }

                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch event", err);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        setRegistering(true);
        try {
            await api.post(`/registrations/${id}`);
            setIsRegistered(true);
            alert('Successfully registered!');
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.msg || 'Registration failed');
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <p>Loading...</p>
        </div>
    );

    if (!event) return (
        <div className="container" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Event not found</h2>
            <Link to="/events" className="text-primary" style={{ textDecoration: 'underline' }}>Back to Events</Link>
        </div>
    );

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div style={{ backgroundColor: 'var(--bg-light)', minHeight: 'calc(100vh - 64px)', paddingBottom: '3rem' }}>
            {/* Banner/Image */}
            <div style={{ height: '24rem', backgroundColor: '#D1D5DB', position: 'relative' }}>
                {event.image ? (
                    <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#312E81', color: 'white' }}>
                        <span style={{ fontSize: '4rem', opacity: 0.5 }}>📅</span>
                    </div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
                <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', padding: '2rem 1rem', width: '100%', color: 'white' }}>
                    <Link to="/events" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', textDecoration: 'none' }}>
                        ← Back to Events
                    </Link>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{event.title}</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ backgroundColor: 'var(--accent-primary)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500' }}>{event.category}</span>
                        <span style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500' }}>
                            {event.registeredCount || 0} / {event.capacity || 100} Registered
                        </span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
                <div className="card" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                    {/* Main Content */}
                    <div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>About this Event</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{event.description}</p>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div>
                        <div style={{ backgroundColor: 'var(--bg-light)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--accent-primary)', fontSize: '1.25rem' }}>📅</span>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>Date</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{formattedDate}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--accent-primary)', fontSize: '1.25rem' }}>⏰</span>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>Time</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{event.startTime} - {event.endTime || 'End'}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--accent-primary)', fontSize: '1.25rem' }}>📍</span>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>Venue</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{event.venue}</p>
                                    <Link to={`/navigation?to=${event.venueLocation || event.venue}`} style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '500', textDecoration: 'none', display: 'block', marginTop: '0.25rem' }}>
                                        Get Directions &rarr;
                                    </Link>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--accent-primary)', fontSize: '1.25rem' }}>👤</span>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>Organizer</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{event.organizer}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            className={`btn ${isRegistered ? 'btn-outline' : 'btn-primary'}`}
                            style={{ width: '100%', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)' }}
                            onClick={handleRegister}
                            disabled={registering || (isRegistered)}
                        >
                            {registering ? 'Processing...' : isRegistered ? 'Already Registered' : 'Register Now'}
                        </button>
                        {(!event.capacity || event.registeredCount < event.capacity) ? null : !isRegistered && (
                            <p style={{ color: '#EF4444', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem' }}>Event Full</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
