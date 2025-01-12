import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Laporan from './pages/admin/Laporan.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const RouteList = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'laporan',
                element: <Laporan />,
            },
        ],
    },
]);

export default RouteList;
