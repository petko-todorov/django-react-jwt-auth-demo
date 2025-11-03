import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { username, password, password2 };

        try {
            const response = await fetch(
                'http://localhost:8000/api/register/',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();
            if (response.ok) {
                const loginResponse = await fetch(
                    'http://localhost:8000/api/token/',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password }),
                    }
                );

                const loginData = await loginResponse.json();
                if (loginResponse.ok) {
                    loginUser(loginData); // Save token in AuthContext
                    navigate('/dashboard'); // Redirect to dashboard
                } else {
                    setError('Registration successful, but login failed.');
                }
            } else {
                setError(data.error || 'Registration failed.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Потребителско име"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Парола"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Потвърдете паролата"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <button type="submit">Регистрирай се</button>
            </form>
        </div>
    );
};

export default RegisterPage;
