import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center h-full">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 no-underline text-primary font-bold text-xl tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-grad-primary flex items-center justify-center text-white font-bold shadow-sm">
                        E
                    </div>
                    <span>Event Manager</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/events" className={`nav-link ${isActive('/events') ? 'active' : ''}`}>
                        Intra Events
                    </Link>
                    <Link to="/events?type=inter" className={`nav-link ${isActive('/events?type=inter') ? 'active' : ''}`}>
                        Inter Events
                    </Link>
                    <Link to="/navigation" className={`nav-link ${isActive('/navigation') ? 'active' : ''}`}>
                        Campus Map
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="nav-link hover:text-red-600 transition-colors bg-transparent border-0 cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="btn-primary no-underline">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
