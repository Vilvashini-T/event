import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import EventCard from '../components/EventCard';

const MyEvents = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const res = await api.get('/registrations/my');
                setRegistrations(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch registrations", err);
                setLoading(false);
            }
        };
        fetchMyEvents();
    }, []);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <p>Loading...</p>
        </div>
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem', minHeight: 'calc(100vh - 64px)' }}>
            <h1 className="text-3xl font-bold mb-6 text-primary">My Schedule</h1>

            {registrations.length === 0 ? (
                <div className="card text-center" style={{ padding: '4rem 2rem' }}>
                    <h2 className="text-xl font-bold mb-2">No Scheduled Events</h2>
                    <p className="text-secondary mb-6">You haven't registered for any events yet.</p>
                    <Link to="/events" className="btn btn-primary">Browse Events</Link>
                </div>
            ) : (
                <div className="grid grid-cols-3">
                    {registrations.map((reg) => (
                        <div key={reg._id} style={{ position: 'relative' }}>
                            <EventCard event={reg.event} />
                            <div style={{
                                position: 'absolute',
                                top: '0.5rem',
                                left: '0.5rem',
                                backgroundColor: '#10B981',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                REGISTERED
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEvents;
