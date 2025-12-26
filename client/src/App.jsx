import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import EventDetails from './pages/EventDetails';
import Navigation from './pages/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'; // Import global CSS

import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageEvents from './pages/admin/ManageEvents';
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import ManageRegistrations from './pages/admin/ManageRegistrations';



function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col font-sans">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Admin Routes */}
                        <Route
                            path="/admin/*"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <Routes>
                                        <Route path="/" element={<AdminDashboard />} />
                                        <Route path="/manage-events" element={<ManageEvents />} />
                                        <Route path="/create-event" element={<CreateEvent />} />
                                        <Route path="/edit-event/:id" element={<EditEvent />} />
                                        <Route path="/manage-registrations" element={<ManageRegistrations />} />
                                    </Routes>
                                </ProtectedRoute>
                            }
                        />

                        {/* User/General Routes */}
                        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                        <Route path="/intra-events" element={<ProtectedRoute><Events type="intra" /></ProtectedRoute>} />
                        <Route path="/inter-events" element={<ProtectedRoute><Events type="inter" /></ProtectedRoute>} />
                        <Route path="/navigation" element={<ProtectedRoute><Navigation /></ProtectedRoute>} />
                        <Route path="/campus-map" element={<ProtectedRoute><Navigation /></ProtectedRoute>} />
                        <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
                        <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
