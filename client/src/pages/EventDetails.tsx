import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/events/${id}`);
                setEvent(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch event", err);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

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
        <div style={{ backgroundColor: '#F9FAFB', minHeight: 'calc(100vh - 64px)', paddingBottom: '3rem' }}>
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
                        <span style={{ backgroundColor: '#4F46E5', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500' }}>{event.category}</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
                <div className="card" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                    {/* Main Content */}
                    <div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>About this Event</h2>
                            <p style={{ color: '#4B5563', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{event.description}</p>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div>
                        <div style={{ backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #F3F4F6', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ color: '#4F46E5', fontSize: '1.25rem' }}>📅</span>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>Date</h4>
                                    <p style={{ color: '#4B5563', fontSize: '0.875rem' }}>{formattedDate}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ color: '#4F46E5', fontSize: '1.25rem' }}>⏰</span>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>Time</h4>
                                    <p style={{ color: '#4B5563', fontSize: '0.875rem' }}>{event.startTime} - {event.endTime || 'End'}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ color: '#4F46E5', fontSize: '1.25rem' }}>📍</span>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>Venue</h4>
                                    <p style={{ color: '#4B5563', fontSize: '0.875rem' }}>{event.venue}</p>
                                    <Link to={`/navigation?to=${event.venueLocation || event.venue}`} style={{ fontSize: '0.75rem', color: '#4F46E5', fontWeight: '500', textDecoration: 'none', display: 'block', marginTop: '0.25rem' }}>
                                        Get Directions &rarr;
                                    </Link>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: '#4F46E5', fontSize: '1.25rem' }}>👤</span>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>Organizer</h4>
                                    <p style={{ color: '#4B5563', fontSize: '0.875rem' }}>{event.organizer}</p>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)' }}>
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
