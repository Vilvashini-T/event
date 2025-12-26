import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">

                {/* Brand */}
                <div className="flex items-center gap-2 mb-6 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        E
                    </div>
                    <span className="font-bold text-lg text-heading tracking-tight">Event Manager</span>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm font-medium text-gray-500">
                    <Link to="/" className="hover:text-teal-600 transition-colors no-underline">Home</Link>
                    <Link to="/events" className="hover:text-teal-600 transition-colors no-underline">Intra-Events</Link>
                    <Link to="/events?type=inter" className="hover:text-teal-600 transition-colors no-underline">Inter-Events</Link>
                    <Link to="/navigation" className="hover:text-teal-600 transition-colors no-underline">Campus Map</Link>
                    <Link to="/login" className="hover:text-teal-600 transition-colors no-underline">Admin Login</Link>
                </div>

                {/* Copyright */}
                <div className="text-xs text-gray-400 max-w-md leading-relaxed">
                    <p className="mb-2">© {currentYear} KEC Smart Campus Portal. All rights reserved.</p>
                    <p>Designed for excellence. Built for students.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
