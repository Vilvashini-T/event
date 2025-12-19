import { useMemo } from 'react';
// Removed unused imports and icons

// Graph Definition
const nodes = {
    // Gates
    'gate1': { id: 'gate1', label: 'Main Gate (Gate 1)', x: 100, y: 500, type: 'gate' },
    'gate2': { id: 'gate2', label: 'Gate 2', x: 800, y: 500, type: 'gate' },
    'gate3': { id: 'gate3', label: 'Gate 3', x: 450, y: 800, type: 'gate' },

    // Venues
    'convention': { id: 'convention', label: 'Convention Center', x: 250, y: 200, type: 'venue' },
    'library': { id: 'library', label: 'Main Library', x: 450, y: 300, type: 'venue' },
    'admin': { id: 'admin', label: 'Admin Block', x: 450, y: 450, type: 'venue' },
    'itpark': { id: 'itpark', label: 'IT Park', x: 650, y: 200, type: 'venue' },
    'foodcourt': { id: 'foodcourt', label: 'Food Court', x: 650, y: 450, type: 'venue' },
    'mainblock': { id: 'mainblock', label: 'Main Block', x: 450, y: 100, type: 'venue' },

    // Intersections
    'i1': { id: 'i1', label: 'Intersection 1', x: 250, y: 450, type: 'intersection' },
    'i2': { id: 'i2', label: 'Intersection 2', x: 650, y: 300, type: 'intersection' },
    'i3': { id: 'i3', label: 'Intersection 3', x: 450, y: 600, type: 'intersection' },
};

const edges = [
    // Links
    ['gate1', 'i1', 1],
    ['i1', 'convention', 1],
    ['i1', 'admin', 1],
    ['admin', 'library', 1],
    ['library', 'mainblock', 1],
    ['admin', 'i3', 1],
    ['i3', 'gate3', 1],
    ['admin', 'foodcourt', 1],
    ['foodcourt', 'gate2', 1], // Simplified
    ['foodcourt', 'i2', 1],
    ['i2', 'itpark', 1],
    ['i2', 'library', 1],
];

// Graph Adjacency List
const graph: Record<string, Record<string, number>> = {};
edges.forEach(([u, v, w]) => {
    if (!graph[u as string]) graph[u as string] = {};
    if (!graph[v as string]) graph[v as string] = {};
    graph[u as string][v as string] = w as number;
    graph[v as string][u as string] = w as number;
});

const dijkstra = (start: string, end: string) => {
    if (!start || !end) return [];
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const queue: string[] = [];

    Object.keys(nodes).forEach(node => {
        distances[node] = Infinity;
        previous[node] = null;
        queue.push(node);
    });

    distances[start] = 0;

    while (queue.length > 0) {
        queue.sort((a, b) => distances[a] - distances[b]);
        const u = queue.shift();
        if (!u) break;

        if (u === end) {
            const path = [];
            let temp: string | null = end;
            while (temp) {
                path.unshift(temp);
                temp = previous[temp];
                if (temp === start) {
                    path.unshift(start);
                    break;
                }
            }
            return path;
        }

        if (distances[u] === Infinity) break;

        if (graph[u]) {
            Object.entries(graph[u]).forEach(([v, weight]) => {
                const alt = distances[u] + weight;
                if (alt < distances[v]) {
                    distances[v] = alt;
                    previous[v] = u;
                }
            });
        }
    }
    return [];
};

interface NavigationMapProps {
    startNode: string;
    endNode: string;
    onSelectNode?: (id: string, type: 'start' | 'end') => void;
}

const NavigationMap = ({ startNode, endNode, onSelectNode }: NavigationMapProps) => {
    const path = useMemo(() => dijkstra(startNode, endNode), [startNode, endNode]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '600px', backgroundColor: '#F3F4F6', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #E5E7EB', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' }}>
            {/* Background Pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: 0.2, pointerEvents: 'none' }}></div>

            {/* SVG Map Layer */}
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5" />
                    </marker>
                </defs>

                {/* Edges */}
                {edges.map(([u, v], i) => {
                    const uNode = nodes[u as keyof typeof nodes];
                    const vNode = nodes[v as keyof typeof nodes];
                    const isPath = path.includes(u as string) && path.includes(v as string) &&
                        (path.indexOf(u as string) === path.indexOf(v as string) - 1 || path.indexOf(v as string) === path.indexOf(u as string) - 1);

                    return (
                        <line
                            key={i}
                            x1={uNode.x} y1={uNode.y}
                            x2={vNode.x} y2={vNode.y}
                            stroke={isPath ? '#4F46E5' : '#D1D5DB'}
                            strokeWidth={isPath ? 4 : 2}
                            style={{ transition: 'all 0.5s' }}
                            strokeDasharray={isPath ? 'none' : '5,5'}
                        />
                    );
                })}

                {/* Nodes */}
                {Object.values(nodes).map((node) => {
                    const isStart = node.id === startNode;
                    const isEnd = node.id === endNode;
                    const isPath = path.includes(node.id);
                    const isVenue = node.type === 'venue';
                    const isGate = node.type === 'gate';

                    if (node.type === 'intersection' && !isPath) return null; // Hide unused intersections

                    return (
                        <g key={node.id} onClick={() => onSelectNode?.(node.id, 'end')} style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}>
                            <circle
                                cx={node.x} cy={node.y}
                                r={isStart || isEnd ? 12 : (isVenue || isGate ? 8 : 4)}
                                fill={isStart ? '#10B981' : isEnd ? '#EF4444' : isPath ? '#4F46E5' : isGate ? '#F59E0B' : '#6B7280'}
                                style={{ transition: 'all 0.3s' }}
                            />
                            {(isVenue || isGate || isStart || isEnd) && (
                                <text
                                    x={node.x} y={node.y - 15}
                                    fontSize="12"
                                    textAnchor="middle"
                                    style={{ fill: '#374151', fontWeight: 'bold', userSelect: 'none', textShadow: '0px 1px 2px white' }}
                                >
                                    {node.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Legend / Info */}
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: 'rgba(255,255,255,0.9)', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                    <span>Start</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
                    <span>Destination</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#4F46E5' }}></span>
                    <span>Path</span>
                </div>
            </div>
        </div>
    );
};

export default NavigationMap;
export { nodes };
