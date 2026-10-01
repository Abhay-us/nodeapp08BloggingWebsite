import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const location = useLocation();

    const token = localStorage.getItem("authToken");
    if (!token) {
        return (
            <>
                <Navigate to="/login" replace state={{ from: location.pathname }} />
            </>
        )
    }
    return <Outlet />
}

export default ProtectedRoutes