import { useEffect, useState } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                setEvents(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch events", err);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter((event: any) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>All Events</h1>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                        <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search events by title or category..."
                            style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB', fontSize: '1rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn" style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Filter
                    </button>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : filteredEvents.length > 0 ? (
                <div className="grid grid-cols-3">
                    {filteredEvents.map((event: any) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    message="No events match your search."
                    actionLabel="Clear Search"
                    onAction={() => setSearchTerm('')}
                />
            )}
        </div>
    );
};

export default Events;
