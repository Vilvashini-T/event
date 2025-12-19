import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                {/* Logo Section */}
                <Link to="/" className="nav-logo">
                    <div className="logo-k">K</div>
                    <span>KEC Smart Campus</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md-flex" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
                    <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>
                        Admin
                    </Link>
                </div>

                {/* Mobile Menu Button - simple fallback */}
                <div className="mobile-menu-btn" style={{ display: 'none' }}>
                    <button onClick={() => setIsOpen(!isOpen)} style={{ color: 'white', background: 'none', border: 'none' }}>Menu</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
