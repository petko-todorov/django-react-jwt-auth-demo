import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const { logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
        navigate('/');
    }, [logoutUser, navigate]);

    return <div>Logging out...</div>;
};

export default LogoutPage;
