import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        startTime: '',
        venue: '',
        venue: '',
        description: '',
        type: 'Intra',
        organizer: ''
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/events/${id}`);
                const event = res.data;
                // Format date to YYYY-MM-DD for input field
                const formattedDate = new Date(event.date).toISOString().split('T')[0];

                setFormData({
                    title: event.title,
                    date: formattedDate,
                    startTime: event.startTime,
                    venue: event.venue,
                    description: event.description,
                    type: event.type || 'Intra',
                    organizer: event.organizer || ''
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching event", err);
                alert("Failed to load event details");
                navigate('/admin/manage-events');
            }
        };
        fetchEvent();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/events/${id}`, formData);
            alert('Event Updated Successfully');
            navigate('/admin/manage-events');
        } catch (err: any) {
            console.error(err);
            const errorMessage = err.response?.data?.error || err.response?.data?.msg || 'Unknown Error';
            alert(`Failed to update event: ${errorMessage}`);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
            <form onSubmit={handleSubmit} className="card p-6" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="mb-4">
                    <label>Event Title</label>
                    <input name="title" value={formData.title} required onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>Date</label>
                        <input type="date" name="date" value={formData.date} required onChange={handleChange} />
                    </div>
                    <div>
                        <label>Start Time</label>
                        <input type="time" name="startTime" value={formData.startTime} required onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-4">
                    <label>Venue</label>
                    <input name="venue" value={formData.venue} required onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label>Organizer</label>
                    <input name="organizer" value={formData.organizer} required onChange={handleChange} placeholder="Club/Dept Name" />
                </div>
                <div className="mb-4">
                    <label>Event Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="Intra">Intra-College (KEC Only)</option>
                        <option value="Inter">Inter-College (Open to All)</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label>Description</label>
                    <textarea name="description" rows={4} value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="btn btn-primary w-full">Update Event</button>
                    <button type="button" onClick={() => navigate('/admin/manage-events')} className="btn btn-outline w-full" style={{ justifyContent: 'center' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;
