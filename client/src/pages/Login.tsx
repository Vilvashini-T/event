import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen pt-20 pb-12 px-4" style={{ backgroundColor: 'var(--bg-page)' }}>
            <div className="card w-full max-w-md p-8 bg-white shadow-sm">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-2 text-primary">Student Login</h2>
                    <p className="text-sm text-secondary">
                        Or <Link to="/register" className="text-teal font-medium no-underline hover:opacity-80 transition-opacity">register for a new account</Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {error && (
                        <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-primary">Email Address</label>
                        <div className="relative">
                            <span className="absolute top-3 left-3 text-secondary opacity-50">✉️</span>
                            <input
                                name="email"
                                type="email"
                                required
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-primary">Password</label>
                        <div className="relative">
                            <span className="absolute top-3 left-3 text-secondary opacity-50">🔒</span>
                            <input
                                name="password"
                                type="password"
                                required
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full"
                    >
                        Sign in &rarr;
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
