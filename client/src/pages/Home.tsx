import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import EventCard from '../components/EventCard';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                setEvents(res.data.slice(0, 3));
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch events", err);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="flex-grow flex flex-col justify-center items-center text-center container pt-40 pb-20 relative overflow-hidden">
                {/* Decorative Blobs - Re-added for depth matching Lovable */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] animate-pulse" style={{ backgroundColor: 'rgba(124, 59, 237, 0.1)' }}></div>
                    <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-teal-200/30 rounded-full blur-[100px] animate-pulse delay-700" style={{ backgroundColor: 'rgba(29, 175, 161, 0.1)' }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-subtle shadow-sm mb-8 animate-float">
                        <span className="flex h-2 w-2 rounded-full bg-teal shadow-glow" style={{ backgroundColor: 'var(--color-teal)' }}></span>
                        <span className="text-xs font-medium text-secondary tracking-wide uppercase">KEC Smart Campus Portal</span>
                    </div>

                    {/* Hero Title (72px match) */}
                    <h1 className="text-7xl font-bold text-primary mb-6">
                        Discover Events. <br />
                        <span className="text-gradient-primary">Navigate Campus.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-secondary text-base max-w-2xl mx-auto mb-10 font-normal">
                        Your unified platform for exploring campus events, navigating the venue, and staying connected with the student community.
                    </p>

                    {/* Action Cards */}
                    <div className="flex justify-center gap-6 flex-wrap mb-16 w-full">
                        {/* Intra-College Button */}
                        <Link to="/events" className="card flex items-center gap-4 p-5 min-w-[280px] no-underline group hover:border-purple">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-purple" style={{ backgroundColor: '#FAF5FF' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8M8 12h8" /></svg>
                            </div>
                            <div className="text-left">
                                <div className="text-primary font-bold">Intra-College</div>
                                <div className="text-secondary text-xs uppercase tracking-wider">Campus Events</div>
                            </div>
                            <div className="ml-auto text-purple opacity-50 group-hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </Link>

                        {/* Inter-College Button */}
                        <Link to="/events?type=inter" className="card flex items-center gap-4 p-5 min-w-[280px] no-underline group hover:border-teal">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-teal" style={{ backgroundColor: '#F0FDFA' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                            </div>
                            <div className="text-left">
                                <div className="text-primary font-bold">Inter-College</div>
                                <div className="text-secondary text-xs uppercase tracking-wider">External Participation</div>
                            </div>
                            <div className="ml-auto text-teal opacity-50 group-hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <div className="container pb-20">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-primary mb-2">Trending Now</h2>
                        <p className="text-secondary text-sm">Don't miss out on the most popular upcoming events.</p>
                    </div>
                    <Link to="/events" className="text-teal font-medium text-sm no-underline hover:opacity-80 transition-opacity">View all events &rarr;</Link>
                </div>

                {loading ? (
                    <div className="text-center text-secondary py-12">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {events.length > 0 ? (
                            events.map((event: any) => (
                                <EventCard key={event._id} event={event} />
                            ))
                        ) : (
                            <div className="text-center text-secondary col-span-full py-12 border border-dashed border-subtle rounded-xl">
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
