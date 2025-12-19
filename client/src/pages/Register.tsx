import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const { confirmPassword, ...registerData } = formData;
            const res = await api.post('/auth/register', registerData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)', backgroundColor: '#F9FAFB', padding: '3rem 1rem' }}>
            <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-center">
                    <h2 style={{ fontSize: '1.875rem', fontWeight: '800', marginBottom: '0.5rem' }}>Create Account</h2>
                    <p style={{ fontSize: '0.875rem', color: '#4B5563' }}>
                        Or <Link to="/login" style={{ color: '#4F46E5', fontWeight: '500', textDecoration: 'none' }}>sign in to existing account</Link>
                    </p>
                </div>
                <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
                    {error && <div style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}

                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', color: '#9CA3AF' }}>👤</span>
                            <input
                                name="name"
                                type="text"
                                required
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', color: '#9CA3AF' }}>✉️</span>
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
                    <div style={{ marginBottom: '1rem' }}>
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
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', color: '#9CA3AF' }}>🔒</span>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
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
                            Register &rarr;
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
