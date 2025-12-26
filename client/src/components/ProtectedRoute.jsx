import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect based on role if they try to access unauthorized area
        // e.g. student trying to access admin -> go to home
        // admin trying to access student (if restricted, though usually admin can see all) -> go to admin home
        return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
