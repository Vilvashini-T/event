import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationMap, { nodes } from '../components/NavigationMap';

const Navigation = () => {
    const location = useLocation();
    const [startNode, setStartNode] = useState('gate1');
    const [endNode, setEndNode] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const to = params.get('to');
        if (to) {
            const matchedNode = Object.values(nodes).find(n =>
                n.id === to || n.label.toLowerCase().includes(to.toLowerCase())
            );
            if (matchedNode) setEndNode(matchedNode.id);
        }
    }, [location]);

    const gates = Object.values(nodes).filter(n => n.type === 'gate');
    const venues = Object.values(nodes).filter(n => n.type === 'venue');

    return (
        <div style={{ padding: '2rem 1rem', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }} className="container">
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexDirection: 'row', flexWrap: 'wrap' }}>
                {/* Controls Sidebar */}
                <div style={{ width: '100%', maxWidth: '350px', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', height: 'fit-content' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#4F46E5' }}>🧭</span> Campus Navigator
                    </h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Start Location</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>📍</span>
                                <select
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={startNode}
                                    onChange={(e) => setStartNode(e.target.value)}
                                >
                                    {gates.map(gate => (
                                        <option key={gate.id} value={gate.id}>{gate.label}</option>
                                    ))}
                                    <option disabled>--- Venues ---</option>
                                    {venues.map(venue => (
                                        <option key={venue.id} value={venue.id}>{venue.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifySelf: 'center', margin: '0.5rem 0' }}>
                            <div style={{ height: '30px', width: '2px', backgroundColor: '#E5E7EB', margin: '0 auto' }}></div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Destination</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#EF4444' }}>📍</span>
                                <select
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem', borderColor: '#EF4444' }}
                                    value={endNode}
                                    onChange={(e) => setEndNode(e.target.value)}
                                >
                                    <option value="" disabled>Select a destination</option>
                                    {venues.map(venue => (
                                        <option key={venue.id} value={venue.id}>{venue.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#EEF2FF', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#4338CA' }}>
                        <p><strong>Tip:</strong> You can click on any venue on the map to set it as your destination.</p>
                    </div>
                </div>

                {/* Map Area */}
                <div style={{ flexGrow: 1 }}>
                    <NavigationMap
                        startNode={startNode}
                        endNode={endNode}
                        onSelectNode={(id) => setEndNode(id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
