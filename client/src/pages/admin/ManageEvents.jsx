import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events (using the existing public endpoint for now, will be secured later)
        axios.get('http://localhost:5000/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error('Error fetching events:', err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            axios.delete(`http://localhost:5000/api/events/${id}`)
                .then(() => setEvents(events.filter((e) => e._id !== id)))
                .catch(err => {
                    console.error('Delete error:', err);
                    alert('Failed to delete event');
                });
        }
    }

    return (
        <div className="min-h-screen bg-page pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-primary mb-2">Manage Events</h1>
                        <p className="text-secondary text-lg">View, edit, or delete scheduled campus events.</p>
                    </div>
                    <Link to="/admin/create-event" className="btn-primary no-underline">
                        + Create New Event
                    </Link>
                </div>

                <div className="card bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-subtle bg-gray-50/50">
                                    <th className="p-5 text-sm font-semibold text-secondary uppercase tracking-wider">Event Title</th>
                                    <th className="p-5 text-sm font-semibold text-secondary uppercase tracking-wider">Date</th>
                                    <th className="p-5 text-sm font-semibold text-secondary uppercase tracking-wider">Venue</th>
                                    <th className="p-5 text-sm font-semibold text-secondary uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-subtle">
                                {events.map((event) => (
                                    <tr key={event._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-5 text-primary font-medium">{event.title}</td>
                                        <td className="p-5 text-secondary">{new Date(event.date).toLocaleDateString()}</td>
                                        <td className="p-5 text-secondary">{event.venue}</td>
                                        <td className="p-5 text-right flex justify-end gap-3">
                                            <Link to={`/admin/edit-event/${event._id}`} className="text-teal font-medium hover:underline text-sm transition-colors">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="text-red-500 font-medium hover:underline text-sm transition-colors border-0 bg-transparent cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {events.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-secondary">
                                            No events found. Create one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageEvents;
