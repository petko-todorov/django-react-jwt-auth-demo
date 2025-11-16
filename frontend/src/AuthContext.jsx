import { createContext, useState, useEffect } from 'react';
import { API_AUTH_URL } from './services';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        return localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null;
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authTokens) {
            const decodedToken = JSON.parse(
                atob(authTokens.access.split('.')[1])
            );
            console.log('Decoded Token:', decodedToken);
            setUser({ username: decodedToken.username, token: decodedToken });
        }
    }, [authTokens]);

    useEffect(() => {
        const checkToken = async () => {
            if (!authTokens) return;

            const decoded = JSON.parse(atob(authTokens.access.split('.')[1]));
            const now = Date.now() / 1000;

            if (decoded.exp < now + 60) {
                try {
                    const response = await fetch(
                        `${API_AUTH_URL}/token/refresh/`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                refresh: authTokens.refresh,
                            }),
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        const newTokens = {
                            access: data.access,
                            refresh: data.refresh,
                        };
                        setAuthTokens(newTokens);
                        localStorage.setItem(
                            'authTokens',
                            JSON.stringify(newTokens)
                        );
                    } else {
                        logoutUser();
                    }
                } catch (error) {
                    console.error('Refresh error:', error);
                    logoutUser();
                }
            }
        };

        checkToken();
    }, [authTokens]);

    const loginUser = (data) => {
        setAuthTokens(data);
        localStorage.setItem('authTokens', JSON.stringify(data));
    };

    const logoutUser = async () => {
        try {
            const response = await fetch(`${API_AUTH_URL}/logout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify({
                    refresh: authTokens.refresh,
                }),
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            console.log('Logout successful');
        } catch (error) {
            console.error('Error while logging out:', error);
        } finally {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens');
        }
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
