import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './Routers';

function Login() {
    const [currentUser, setCurrentUser] = useContext(Context);
    const [name, setName] = useState("");
    const [subscriptionNum, setSubscriptionNum] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, subscriptionNum })
            });
            if (!res.ok) throw new Error("Server Error");

            const user = await res.json();

            if (user && user.id && user.role) {
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                setName("");
                setSubscriptionNum("");

                if (user.role === 'manager') {
                    navigate('/manager/homepage');
                } else if (user.role === 'subscription') {
                    navigate('/subscription/homepage');
                } else {
                    setErrorMessage("Unknown user role.");
                }
            } else {
                setErrorMessage("Incorrect name or subscription number.");
            }
        } catch (e) {
            setErrorMessage("Incorrect name or subscription number.");
        }
    }

    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Subscription Number:
                        <input
                            type="number"
                            value={subscriptionNum}
                            onChange={e => setSubscriptionNum(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{marginTop: "20px", fontSize: "1.2rem"}}>Login</button>
            </form>
            <button
                style={{marginTop: "30px", fontSize: "1.1rem"}}
                onClick={() => navigate('/signup')}
            >
                להרשמה
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default Login;