import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
// Removed icons

const Login = () => {
    // useState to manage form inputs
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to redirect users

    // Update state when user types
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        try {
            const res = await api.post('/auth/login', formData);
            // Save token to browser storage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            // Redirect to home page
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)', backgroundColor: '#F9FAFB', padding: '3rem 1rem' }}>
            <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-center">
                    <h2 style={{ fontSize: '1.875rem', fontWeight: '800', marginBottom: '0.5rem' }}>Student Login</h2>
                    <p style={{ fontSize: '0.875rem', color: '#4B5563' }}>
                        Or <Link to="/register" style={{ color: '#4F46E5', fontWeight: '500', textDecoration: 'none' }}>register for a new account</Link>
                    </p>
                </div>

                <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
                    {error && <div style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}

                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', color: '#9CA3AF' }}>👤</span>
                            <input
                                name="email"
                                type="email"
                                required
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', color: '#9CA3AF' }}>🔒</span>
                            <input
                                name="password"
                                type="password"
                                required
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            Sign in &rarr;
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
