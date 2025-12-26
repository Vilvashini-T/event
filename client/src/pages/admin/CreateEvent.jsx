import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        startTime: '',
        venue: '',
        description: '',
        type: 'Intra',
        organizer: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/events', formData); // Using secured API instance
            alert('Event Created Successfully');
            navigate('/admin/manage-events');
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.error || err.response?.data?.msg || 'Unknown Error';
            alert(`Failed to create event: ${errorMessage}`);
        }
    };

    return (
        <div className="min-h-screen bg-page pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-2">Create New Event</h1>
                    <p className="text-secondary text-lg">Detailed form to publish a new campus event.</p>
                </div>

                <form onSubmit={handleSubmit} className="card p-8 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Event Title</label>
                            <input name="title" required onChange={handleChange} placeholder="e.g. AI Symposium 2024" className="form-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Organizer</label>
                            <input name="organizer" required onChange={handleChange} placeholder="Club/Dept Name" className="form-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Date</label>
                            <input type="date" name="date" required onChange={handleChange} className="form-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Start Time</label>
                            <input type="time" name="startTime" required onChange={handleChange} className="form-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Venue</label>
                            <input name="venue" required onChange={handleChange} placeholder="e.g. Convention Center" className="form-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Event Type</label>
                            <select name="type" onChange={handleChange} className="form-input">
                                <option value="Intra">Intra-College (KEC Only)</option>
                                <option value="Inter">Inter-College (Open to All)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-primary mb-2">Description</label>
                        <textarea name="description" rows={4} onChange={handleChange} placeholder="Event details..." className="form-input h-auto"></textarea>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={() => navigate('/admin/dashboard')} className="px-6 py-2.5 rounded-lg border border-subtle text-secondary font-medium hover:bg-page transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary px-8">Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
