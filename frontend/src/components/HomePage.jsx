import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>Welcome to the App</h1>
            <p>Choose an option to get started:</p>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default HomePage;
