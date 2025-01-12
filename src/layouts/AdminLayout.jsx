import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaList, FaUserCircle } from "react-icons/fa";
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { logout } from '../redux/AuthSlice';
import Button from '../components/Button';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            dispatch(logout());

            Swal.fire({
                icon: "success",
                title: "Logout Berhasil",
                text: "Anda berhasil logout dari sistem",
            });

            setTimeout(() => {
                navigate('/');  
            }, 1500); 

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Logout Gagal",
                text: "Terjadi kesalahan saat logout. Silakan coba lagi.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-row">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header username={user?.name || 'Unknown'} onLogout={handleLogout} />
                <main className="flex-grow p-4 bg-gray-100">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node,
};

const Header = ({ username, onLogout }) => {
    return (
        <header className="flex justify-end items-center bg-blue-800 p-4">
            <div className="flex items-center">
                <span className="mr-4 text-white">{username}</span>
                <FaUserCircle className="text-white text-2xl mr-2" />
                <Button className="bg-red-600 text-white hover:bg-red-500" onClick={onLogout}>
                    Logout
                </Button>
            </div>
        </header>
    );
};

Header.propTypes = {
    username: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
};

const Sidebar = () => {
    return (
        <aside className="w-64 bg-blue-800 p-4 text-white">
            <h2 className="text-center text-2xl">Admin Panel</h2>
            <div className="p-4">
                <nav className="mt-4">
                    <ul>
                        <li>
                            <Link to="/admin" className="flex items-center px-4 py-2 bg-blue-700 rounded mb-4 text-white hover:bg-blue-600">
                                <FaTachometerAlt className="mr-2" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/laporan" className="flex items-center px-4 py-2 bg-blue-700 rounded mb-4 text-white hover:bg-blue-600">
                                <FaList className="mr-2" />
                                Laporan
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

const Footer = () => (
    <footer className="bg-blue-800 p-4 text-white text-center">
        <p>&copy; 2024 Admin Panel</p>
    </footer>
);

export default AdminLayout;
