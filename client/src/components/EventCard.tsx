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
        <div className="card flex flex-col h-full group cursor-pointer">
            <div className="relative h-48 bg-gray-50 overflow-hidden">
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-secondary text-sm font-medium bg-gray-100">
                        Image Placeholder
                    </div>
                )}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-xs font-bold text-teal uppercase tracking-wide">
                    {event.category}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-3 text-primary truncate leading-tight group-hover:text-teal transition-colors">
                    {event.title}
                </h3>

                <div className="text-sm text-secondary mb-6 flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                        <span className="opacity-70">📅</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <span className="opacity-70">⏰</span>
                        <span>{event.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <span className="opacity-70">📍</span>
                        <span className="truncate">{event.venue}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-subtle flex justify-between items-center">
                    <Link
                        to={`/events/${event._id}`}
                        className="text-teal font-medium text-sm no-underline hover:opacity-80 transition-opacity flex items-center gap-1"
                    >
                        View Details <span className="text-lg leading-none">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
