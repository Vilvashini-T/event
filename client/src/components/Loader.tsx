// Simple CSS Spinner Loader
const Loader = () => {
    return (
        <div className="flex fn-center" style={{ padding: '3rem', flexDirection: 'column', gap: '1rem' }}>
            <div className="spinner"></div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Loading...</p>

            {/* Inline styles for spinner animation - usually this would go in App.css */}
            <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid var(--primary-color, #4F46E5);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Loader;
