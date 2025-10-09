import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authTokens) {
            // Декодиране на токена
            const decodedToken = JSON.parse(atob(authTokens.access.split('.')[1]));
            console.log("Decoded Token:", decodedToken);

            setUser({ username: decodedToken.username });
        }
    }, [authTokens]);

    const loginUser = (data) => {
        setAuthTokens(data);
        localStorage.setItem('authTokens', JSON.stringify(data));
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
