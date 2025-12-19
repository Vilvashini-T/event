import { Link } from 'react-router-dom';

interface EventProps {
    _id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    venue: string;
    image?: string;
    category: string;
}

const EventCard = ({ event }: { event: EventProps }) => {
    // Format the date to look nice (e.g., "October 24, 2025")
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ height: '12rem', backgroundColor: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                {event.image ? (
                    <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        NO IMAGE
                    </div>
                )}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--bg-dark)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-primary)', textTransform: 'uppercase', border: '1px solid var(--border-color)' }}>
                    {event.category}
                </div>
            </div>

            <div className="p-4" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="text-primary" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</h3>

                <div className="text-secondary" style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>Date:</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>Time:</span>
                        <span>{event.startTime}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>Venue:</span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.venue}</span>
                    </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link
                        to={`/events/${event._id}`}
                        style={{ color: 'var(--accent-primary)', fontWeight: '500', fontSize: '0.875rem', textDecoration: 'none' }}
                    >
                        View Details &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
