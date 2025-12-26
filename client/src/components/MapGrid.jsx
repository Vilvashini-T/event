import { useState, useEffect } from 'react';

// Simple Grid visualization
const MapGrid = ({ startNodeId }) => {
    // Grid configuration
    const rows = 15;
    const cols = 20;

    // Define locations
    const locations = {
        '0-4': { r: 12, c: 2, label: 'Gate 1', color: 'orange' },
        '1-13': { r: 5, c: 18, label: 'Gate 2', color: 'orange' },
        '2-6': { r: 3, c: 8, label: 'Main', color: 'teal' },
        '5-7': { r: 7, c: 10, label: 'Central', color: 'gray' },
        '4-9': { r: 10, c: 12, label: 'Mech', color: 'gray' },
        '4-3': { r: 11, c: 6, label: 'Admin', color: 'gray' },
        '4-6': { r: 5, c: 6, label: 'ECE', color: 'gray' },
        '4-10': { r: 5, c: 14, label: 'CSD', color: 'gray' },
    };

    // Path state
    const [path, setPath] = useState([]);

    useEffect(() => {
        if (startNodeId && locations[startNodeId]) {
            // Visualize a simple path just for demo
            // In a real app, this would use Dijkstra/A*
            // Here we just draw a line to "Main" block as default destination for demo

            const start = locations[startNodeId];
            const end = locations['2-6']; // Main block

            const newPath = [];
            // Simple Manhattan path
            // Move horizontally then vertically
            let currR = start.r;
            let currC = start.c;

            while (currC !== end.c) {
                newPath.push(`${currR}-${currC}`);
                currC += (currC < end.c ? 1 : -1);
            }
            while (currR !== end.r) {
                newPath.push(`${currR}-${currC}`);
                currR += (currR < end.r ? 1 : -1);
            }
            newPath.push(`${end.r}-${end.c}`);
            setPath(newPath);
        } else {
            setPath([]);
        }
    }, [startNodeId]);

    // Render Grid
    const renderGrid = () => {
        const grid = [];
        for (let r = 0; r < rows; r++) {
            const rowCells = [];
            for (let c = 0; c < cols; c++) {
                const id = `${r}-${c}`;

                // Check if this cell is a location
                let cellContent = null;
                const locKey = Object.keys(locations).find(key => {
                    const loc = locations[key];
                    return loc.r === r && loc.c === c;
                });

                const isPath = path.includes(id);

                if (locKey) {
                    const loc = locations[locKey];
                    cellContent = (
                        <div className={`relative flex items-center justify-center w-12 h-12 rounded-lg shadow-md z-10 
                            ${loc.color === 'orange' ? 'bg-orange-500 text-white' :
                                loc.color === 'teal' ? 'bg-teal-500 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                            {loc.color === 'orange' ? (
                                <span className="w-4 h-4 rounded-full bg-white"></span>
                            ) : (
                                <span className="text-xs font-bold">{loc.label}</span>
                            )}

                            {/* Label for Gates */}
                            {loc.color === 'orange' && (
                                <span className="absolute top-14 text-xs font-medium text-gray-500 whitespace-nowrap">{loc.label}</span>
                            )}
                        </div>
                    );
                } else if (isPath) {
                    cellContent = (
                        <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                    );
                } else {
                    // Empty grid cell dots
                    // Only show sporadically or just tiny dots
                    if (r % 2 === 0 && c % 2 === 0) {
                        // cellContent = <div className="w-1 h-1 rounded-full bg-gray-200"></div>;
                    }
                }

                rowCells.push(
                    <div key={id} className="w-10 h-10 flex items-center justify-center relative">
                        {cellContent}
                    </div>
                );
            }
            grid.push(<div key={r} className="flex">{rowCells}</div>);
        }
        return grid;
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-auto p-4 relative">
            {/* Dashed Border Container mimicking screenshot */}
            <div className="relative border-2 border-dashed border-slate-300 rounded-3xl p-8 bg-white/50">
                {renderGrid()}
            </div>
        </div>
    );
};

export default MapGrid;
