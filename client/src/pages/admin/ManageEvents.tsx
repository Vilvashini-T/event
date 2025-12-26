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

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            axios.delete(`http://localhost:5000/api/events/${id}`)
                .then(() => setEvents(events.filter((e: any) => e._id !== id)))
                .catch(err => {
                    console.error('Delete error:', err);
                    alert('Failed to delete event');
                });
        }
    }

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Events</h1>
                <Link to="/admin/create-event" className="btn btn-primary">Create New Event</Link>
            </div>
            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Venue</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event: any) => (
                            <tr key={event._id}>
                                <td>{event.title}</td>
                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                <td>{event.venue}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link to={`/admin/edit-event/${event._id}`} className="text-accent-primary hover:text-white mr-4" style={{ color: 'var(--accent-secondary)', textDecoration: 'none', fontWeight: 500 }}>Edit</Link>
                                    <button onClick={() => handleDelete(event._id)} className="btn btn-outline" style={{ border: '1px solid #ef4444', color: '#ef4444', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {events.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center text-secondary" style={{ padding: '3rem' }}>
                                    No events found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageEvents;
