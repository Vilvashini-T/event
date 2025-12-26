import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', paddingTop: '4rem', paddingBottom: '3rem', marginTop: 'auto', fontSize: '0.875rem' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <div className="flex items-center gap-2 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #6366f1, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>
                                E
                            </div>
                            <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: 'white', letterSpacing: '-0.025em' }}>KEC Events</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '320px', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                            The official smart campus platform for Kongu Engineering College. Discover, participate, and navigate specialized events with ease.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', opacity: 0.7 }}>
                            {/* Social Placeholders */}
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}>𝕏</div>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}>in</div>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}>ig</div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Platform</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link to="/events" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Browse Events</Link></li>
                            <li><Link to="/events?type=intra" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Intra-College</Link></li>
                            <li><Link to="/events?type=inter" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Inter-College</Link></li>
                            <li><Link to="/navigation" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Campus Map</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Resources</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Student Guide</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Event Rules</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Organizer Portal</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>FAQs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Service</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Cookie Policy</a></li>
                            <li><Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Admin Access</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    <p>© {currentYear} Kongu Engineering College. All rights reserved.</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Made with <span style={{ color: '#f87171' }}>♥</span> by KEC Software Cell
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
