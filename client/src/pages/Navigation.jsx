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
        <div className="container py-8 min-h-screen flex flex-col">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* Controls Sidebar */}
                <div className="card p-6 w-full md:w-80 h-fit bg-white">
                    <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-blue-600">🧭</span> Campus Navigator
                    </h1>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1 text-gray-600">Start Location</label>
                            <div className="input-with-icon-wrapper">
                                <span className="input-icon">📍</span>
                                <select
                                    className="form-select pl-10"
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

                        <div className="flex justify-center my-2">
                            <div className="h-8 w-0.5 bg-gray-200"></div>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 text-gray-600">Destination</label>
                            <div className="input-with-icon-wrapper">
                                <span className="input-icon text-red-500">📍</span>
                                <select
                                    className="form-select pl-10 border-red-300 focus:border-red-500"
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

                    <div className="mt-6 p-4 bg-purple-100 rounded-md text-sm text-purple-700">
                        <p><strong>Tip:</strong> You can click on any venue on the map to set it as your destination.</p>
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-grow card h-[600px] overflow-hidden">
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
