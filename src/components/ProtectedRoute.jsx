import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token); 

    useEffect(() => {
        if (!token) {
            navigate('/'); 
        }
    }, [token, navigate]); 

    return <>{children}</>; 
};

export default ProtectedRoute;
