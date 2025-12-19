const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#1F2937', color: 'white', padding: '2rem 0', marginTop: 'auto' }}>
            <div className="container">
                <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#4F46E5' }}>KEC Smart Campus</h3>
                        <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>
                            Enhancing campus experience with smart navigation and unified event management for Kongu Engineering College.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#9CA3AF' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a href="/events" style={{ color: 'inherit', textDecoration: 'none' }}>Upcoming Events</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="/navigation" style={{ color: 'inherit', textDecoration: 'none' }}>Campus Map</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Student Login</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Contact</h4>
                        <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>
                            Kongu Engineering College<br />
                            Perundurai, Erode - 638060<br />
                            Tamil Nadu, India.
                        </p>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #374151', marginTop: '2rem', paddingTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#6B7280' }}>
                    &copy; {new Date().getFullYear()} KEC Smart Campus. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
