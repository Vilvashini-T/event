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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
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
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="form-container">
            <div className="auth-card">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2 text-heading">Create Account</h2>
                    <p className="text-sm text-muted">
                        Or <Link to="/login" className="text-brand font-medium no-underline">sign in to existing account</Link>
                    </p>
                </div>
                <form className="mt-8" onSubmit={handleSubmit}>
                    {error && <div style={{ backgroundColor: '#FEF2F2', color: 'var(--status-error)', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.875rem', marginBottom: '1rem', border: '1px solid var(--status-error)' }}>{error}</div>}

                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontSize: '1.25rem' }}>👤</span>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-200 text-sm focus:border-brand"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontSize: '1.25rem' }}>✉️</span>
                            <input
                                name="email"
                                type="email"
                                required
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.375rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-body)', fontSize: '0.875rem' }}
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontSize: '1.25rem' }}>🔒</span>
                            <input
                                name="password"
                                type="password"
                                required
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.375rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-body)', fontSize: '0.875rem' }}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontSize: '1.25rem' }}>🔒</span>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.375rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-body)', fontSize: '0.875rem' }}
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
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.75rem', backgroundColor: 'var(--text-heading)', color: 'white', border: 'none', borderRadius: '0.375rem', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}
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
