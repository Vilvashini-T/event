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
                    data = data.filter((e: any) => e.category === filter);
                }

                // Show upcoming only
                data = data.filter((e: any) => new Date(e.date) >= new Date());

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
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="flex-grow flex flex-col justify-center items-center text-center container" style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
                <div className="max-w-4xl mx-auto">
                    <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '0.875rem', color: '#9ca3af' }}>
                        v2.0 Now Available
                    </div>

                    <h1 className="hero-gradient-text" style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        KEC Smart Campus<br />
                        Event & Navigation Portal
                    </h1>

                    <p className="text-secondary" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
                        Your unified platform for exploring campus events, navigating the venue, and staying connected with the student community.
                    </p>

                    <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap' }}>
                        <Link to="/events" className="card flex items-center gap-4" style={{ padding: '1.5rem 2rem', textDecoration: 'none', minWidth: '240px' }}>
                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8M8 12h8" /></svg>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div className="text-primary font-bold">Intra-College</div>
                                <div className="text-secondary" style={{ fontSize: '0.875rem' }}>Campus Events</div>
                            </div>
                        </Link>

                        <Link to="/events?type=inter" className="card flex items-center gap-4" style={{ padding: '1.5rem 2rem', textDecoration: 'none', minWidth: '240px' }}>
                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(14, 165, 233, 0.1)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div className="text-primary font-bold">Inter-College</div>
                                <div className="text-secondary" style={{ fontSize: '0.875rem' }}>External Participation</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Events Preview */}
            <div className="container" style={{ paddingBottom: '4rem' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-primary">Upcoming Events</h2>
                    <div className="flex gap-2">
                        <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
                        <button onClick={() => setFilter('technical')} className={`px-3 py-1 rounded text-sm ${filter === 'technical' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Technical</button>
                        <button onClick={() => setFilter('cultural')} className={`px-3 py-1 rounded text-sm ${filter === 'cultural' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Cultural</button>
                        <button onClick={() => setFilter('sports')} className={`px-3 py-1 rounded text-sm ${filter === 'sports' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Sports</button>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">Showing {events.length} events</span>
                    <Link to="/events" className="text-secondary" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>View all events &rarr;</Link>
                </div>

                {loading ? (
                    <div className="text-center text-secondary" style={{ padding: '2rem' }}>Loading...</div>
                ) : (
                    <div className="grid grid-cols-3">
                        {events.length > 0 ? (
                            events.map((event: any) => (
                                <EventCard key={event._id} event={event} />
                            ))
                        ) : (
                            <div className="text-center text-secondary" style={{ gridColumn: '1 / -1', padding: '2rem', border: '1px dashed var(--border-color)', borderRadius: '0.5rem' }}>
                                No upcoming events found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
