const EmptyState = ({ message = "No items found", actionLabel, onAction }) => {
    return (
        <div className="text-center" style={{
            padding: '4rem 2rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '1rem',
            border: '2px dashed #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
        }}>
            <div style={{ fontSize: '3rem', opacity: 0.5 }}>📂</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151' }}>{message}</h3>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="btn btn-outline"
                    style={{ color: '#4F46E5', borderColor: '#4F46E5', marginTop: '0.5rem' }}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
