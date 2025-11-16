import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.username}</p>
                    <ul>
                        {Object.entries(user.token).map(([key, value]) => (
                            <li key={key}>
                                {key}: {value}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DashboardPage;
