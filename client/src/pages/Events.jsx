import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    // Determine title based on query param
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    const pageTitle = type === 'inter' ? 'Inter-College Events' : type === 'intra' ? 'Intra-College Events' : 'All Events';

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

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container min-h-screen py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-6 text-heading">{pageTitle}</h1>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="input-with-icon-wrapper flex-grow">
                        <span className="input-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search events by title or category..."
                            className="form-select pl-10"
                            style={{ backgroundImage: 'none' }} /* Override select arrow if reusing class, or just use input styles */
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn bg-white text-body border border-gray-200 hover:shadow-md">
                        Filter
                    </button>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : filteredEvents.length > 0 ? (
                <div className="grid-responsive">
                    {filteredEvents.map((event) => (
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
