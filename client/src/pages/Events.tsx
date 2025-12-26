import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import EventCard from '../components/EventCard';

const Events = ({ type: propType }: { type?: 'intra' | 'inter' }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    // Determine type
    const queryParams = new URLSearchParams(location.search);
    const type = propType || queryParams.get('type');
    const pageTitle = type === 'inter' ? 'Inter-College Events' : type === 'intra' ? 'Intra-College Events' : 'All Events';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                setEvents(res.data);
            } catch (err) {
                console.error("Failed to fetch events", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter((event: any) =>
        (!type || (type === 'intra' && event.category !== 'Inter-College') || (type === 'inter' && event.category === 'Inter-College')) &&
        (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen pb-12" style={{ marginTop: '65px' }}>
            {/* Header */}
            <div className={`w-full py-16 px-4 mb-12 border-b border-subtle bg-white relative overflow-hidden`}>
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-page border border-subtle">
                        <span className="w-2 h-2 rounded-full bg-teal"></span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                            {type === 'intra' ? 'KEC Students Only' : type === 'inter' ? 'Open to All Colleges' : 'Campus Events'}
                        </span>
                    </div>

                    <h1 className="text-7xl font-bold mb-6 text-primary tracking-tight">
                        {pageTitle}
                    </h1>

                    <p className="max-w-2xl text-lg text-secondary leading-relaxed">
                        {type === 'intra' && "Exclusive events for Kongu Engineering College students."}
                        {type === 'inter' && "Network and compete with peers from other institutions."}
                        {!type && "Browse all upcoming events happening at KEC."}
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4">
                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-6 mb-10 justify-between items-center">
                    <div className="text-sm font-medium text-secondary">
                        Showing <span className="text-primary font-bold">{filteredEvents.length}</span> events
                    </div>

                    <div className="w-full md:w-auto relative group">
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="form-input w-full md:w-80 pl-10"
                            style={{ paddingLeft: '2.75rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3 top-3 text-secondary opacity-50 group-hover:opacity-100 transition-opacity">🔍</span>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="py-20 text-center text-secondary">Loading...</div>
                ) : filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event: any) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border border-dashed border-subtle rounded-xl bg-page">
                        <p className="text-secondary mb-2">No events found matching your criteria.</p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-sm text-teal font-medium hover:underline cursor-pointer bg-transparent border-0"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
