import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import EventCard from '../components/EventCard';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                let data = res.data;

                // Simple client-side filtering
                if (filter !== 'all') {
                    data = data.filter(e => e.category === filter);
                }

                // Show upcoming only
                data = data.filter(e => new Date(e.date) >= new Date());

                // Sort by date soonest first
                data.sort((a, b) => new Date(a.date) - new Date(b.date));

                setEvents(data.slice(0, 6)); // Show top 6
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch events", err);
                setLoading(false);
            }
        };
        fetchEvents();
    }, [filter]);

    return (
        <div className="flex flex-col min-h-screen relative" style={{ overflow: 'hidden' }}>
            {/* Background Glows */}
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute', top: '20%', right: '-10%', width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            {/* Hero Section */}
            <section className="flex-grow flex flex-col justify-center items-center text-center container" style={{ paddingTop: '80px', paddingBottom: '4rem', zIndex: 1, position: 'relative' }}>



                <h1 className="hero-gradient-text" style={{
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    KEC Smart Campus<br />
                    <span style={{ color: '#8b5cf6', WebkitTextFillColor: '#8b5cf6' }}>Event Portal</span>
                </h1>

                <p className="text-secondary" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
                    Discover events, seamless registration, and campus navigation.<br />
                    All in one unified platform.
                </p>

                <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap' }}>
                    <Link to="/events" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem', boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)' }}>
                        Explore Events
                    </Link>
                    <Link to="/navigation" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        View Output Map
                    </Link>
                </div>
            </section>

            {/* Event Preview Section */}
            <div className="container" style={{ paddingBottom: '4rem', zIndex: 1, position: 'relative' }}>
                <div className="flex justify-between items-center mb-6" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 className="text-3xl font-bold" style={{
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Upcoming Events
                    </h2>

                    {/* Filters */}
                    <div className="flex gap-2" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {['all', 'technical', 'cultural', 'sports'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.375rem',
                                    border: 'none',
                                    background: filter === f ? 'var(--accent-primary)' : 'transparent',
                                    color: filter === f ? 'white' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-secondary" style={{ padding: '4rem' }}>
                        <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid rgba(139, 92, 246, 0.3)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : (
                    <div className="grid grid-cols-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {events.length > 0 ? (
                            events.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))
                        ) : (
                            <div className="text-center text-secondary" style={{ gridColumn: '1 / -1', padding: '3rem', border: '1px dashed var(--border-color)', borderRadius: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                No upcoming events found for this category.
                            </div>
                        )}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/events" className="text-secondary hover:text-white transition-colors" style={{ textDecoration: 'none', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
                        View all events &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
