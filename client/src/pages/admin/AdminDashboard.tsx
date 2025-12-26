import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-page pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
                    <p className="text-secondary text-lg">Manage events, registrations, and analytics for the dedicated campus portal.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Event Management Card */}
                    <div className="card p-8 bg-white flex flex-col items-start group hover:border-teal transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-2xl mb-6 text-teal">
                            📅
                        </div>
                        <h2 className="text-xl font-bold text-primary mb-3">Event Management</h2>
                        <p className="text-secondary mb-6 flex-grow">Create new events, update existing details, or remove obsolete entries from the portal.</p>
                        <Link to="/admin/manage-events" className="text-teal font-medium text-sm no-underline hover:opacity-80 transition-opacity flex items-center gap-1">
                            Manage Events <span className="text-lg leading-none">&rarr;</span>
                        </Link>
                    </div>

                    {/* Registrations Card */}
                    <div className="card p-8 bg-white flex flex-col items-start group hover:border-purple transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center text-2xl mb-6 text-purple">
                            👥
                        </div>
                        <h2 className="text-xl font-bold text-primary mb-3">Registrations</h2>
                        <p className="text-secondary mb-6 flex-grow">Track participation, view student details, and export registration lists.</p>
                        <Link to="/admin/manage-registrations" className="text-purple font-medium text-sm no-underline hover:opacity-80 transition-opacity flex items-center gap-1">
                            View Registrations <span className="text-lg leading-none">&rarr;</span>
                        </Link>
                    </div>

                    {/* Analytics Card */}
                    <div className="card p-8 bg-white flex flex-col items-start border-subtle relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 bg-gray-100 text-xs font-bold text-secondary uppercase tracking-wide rounded-bl-lg">Beta</div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-6 text-secondary opacity-50">
                            📊
                        </div>
                        <h2 className="text-xl font-bold text-primary mb-3 opacity-75">Analytics</h2>
                        <p className="text-secondary mb-6 flex-grow opacity-75">View detailed insights on student engagement and event popularity.</p>
                        <span className="text-secondary text-sm font-medium cursor-not-allowed opacity-50">Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
