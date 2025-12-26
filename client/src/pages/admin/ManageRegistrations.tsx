import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../services/api';

const ManageRegistrations = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all events to show export options
        // Ideally, we might want a specific endpoint to list events with registration counts
        axios.get('http://localhost:5000/api/events')
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleExport = async (eventId: string, eventTitle: string) => {
        try {
            const response = await api.get(`/registrations/export/${eventId}`, {
                responseType: 'blob', // Important for file download
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `registrations-${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Export failed', err);
            alert('Failed to export registrations');
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Registrations</h1>
            <p className="mb-4 text-gray-600">Select an event to export participant list.</p>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((event: any) => (
                            <tr key={event._id}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{event.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(event.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleExport(event._id, event.title)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                                    >
                                        Export CSV
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegistrations;
