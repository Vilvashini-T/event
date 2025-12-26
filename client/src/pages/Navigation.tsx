import { useState } from 'react';
import MapGrid from '../components/MapGrid';
import '../MapGrid.css';

const Navigation = () => {
    // Hardcoded Node Mapping for demo
    // 0-4: Gate 1
    // 1-13: Gate 2
    // 2-6: Main
    // 5-7: Central
    // 4-9: Mech
    // 4-3: Admin
    // 4-6: ECE
    // 4-10: CSD

    const [startNode, setStartNode] = useState('');

    return (
        <div className="min-h-screen bg-page pt-24 pb-12">

            {/* Header */}
            <div className="container mx-auto px-4 mb-10">
                <div className="max-w-4xl text-center mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-subtle shadow-sm mb-6 animate-float">
                        <span className="w-2 h-2 rounded-full bg-teal"></span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">Campus Navigation</span>
                    </div>
                    <h1 className="text-7xl font-bold text-primary mb-6 tracking-tight">Interactive Map</h1>
                    <p className="text-secondary text-lg max-w-2xl mx-auto">
                        Find shortest paths between key campus locations. Select your entry point to visualize the optimal route.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Map Interaction Column */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Controls Card */}
                        <div className="card p-6 bg-white">
                            <label className="block text-sm font-medium text-primary mb-3">Entrance Points</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <select
                                    value={startNode}
                                    onChange={(e) => setStartNode(e.target.value)}
                                    className="form-input flex-grow"
                                >
                                    <option value="">Select Entry Gate...</option>
                                    <option value="0-4">Gate 1 (Main Entrance)</option>
                                    <option value="1-13">Gate 2 (Back Entrance)</option>
                                </select>
                                <button
                                    disabled={!startNode}
                                    className={`btn-primary px-8 ${!startNode ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Show Path
                                </button>
                            </div>
                        </div>

                        {/* Map Container */}
                        <div className="card p-1 min-h-[500px] flex flex-col">
                            <div className="px-5 py-3 border-b border-subtle flex justify-between items-center text-xs text-secondary font-medium uppercase tracking-wide">
                                <span>Campus Grid Layout</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live View</span>
                            </div>
                            <div className="flex-grow p-6 bg-page">
                                {/* Using existing MapGrid component */}
                                <MapGrid startNodeId={startNode} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="card p-6 bg-white">
                            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                Key Venues
                            </h3>
                            <div className="space-y-3">
                                <div className="p-4 rounded-xl border border-subtle bg-page hover:border-teal transition-colors cursor-default group">
                                    <div className="font-bold text-primary group-hover:text-teal transition-colors">Main Block</div>
                                    <div className="text-xs text-secondary mt-1">Admin, Auditorium, Exhibition Hall</div>
                                </div>
                                <div className="p-4 rounded-xl border border-subtle bg-page hover:border-teal transition-colors cursor-default group">
                                    <div className="font-bold text-primary group-hover:text-teal transition-colors">CSD Block</div>
                                    <div className="text-xs text-secondary mt-1">CSE Dept, Labs, Seminar Halls</div>
                                </div>
                                <div className="p-4 rounded-xl border border-subtle bg-page hover:border-teal transition-colors cursor-default group">
                                    <div className="font-bold text-primary group-hover:text-teal transition-colors">ECE Block</div>
                                    <div className="text-xs text-secondary mt-1">ECE Dept, DSP Lab, Communication Lab</div>
                                </div>
                                <div className="p-4 rounded-xl border border-subtle bg-page hover:border-teal transition-colors cursor-default group">
                                    <div className="font-bold text-primary group-hover:text-teal transition-colors">Mech Block</div>
                                    <div className="text-xs text-secondary mt-1">Mechanical Dept, Workshops</div>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6 bg-white">
                            <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-wide">Map Legend</h3>
                            <div className="space-y-3 text-sm text-secondary">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                                    <span>Start Node (Gate)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                                    <span>Target Node (Venue)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                                    <span>Calculated Path</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded bg-gray-800 shadow-sm"></div>
                                    <span>Obstacle / Wall</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
