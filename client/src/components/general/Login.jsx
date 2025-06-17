import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './Routers';
import '../../css/register.css'; 
function Login() {
    const [currentUser, setCurrentUser] = useContext(Context);
    const [name, setName] = useState("");
    const [subscriberNum, setSubscriberNum] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, subscriberNum })
            });
            if (!res.ok) throw new Error("Server Error");

            const user = await res.json();

            if (user && user.id && user.role) {
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                setName("");
                setSubscriberNum("");

                if (user.role === 'manager') {
                    navigate('/manager/homepage');
                } else if (user.role === 'subscriber') {
                    navigate('/subscriber/homepage');
                } else {
                    setErrorMessage("Unknown user role.");
                }
            } else {
                setErrorMessage("Incorrect name or subscriber number.");
            }
        } catch (e) {
            setErrorMessage("Incorrect name or subscriber number.");
        }
    }

    return (
        <div className='page backgroundImagePage'>
            <button onClick={() => navigate('/')}>
                Home
            </button>
            <h1  className="whiteText">Login</h1>
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
                        subscriber Number:
                        <input
                            type="number"
                            value={subscriberNum}
                            onChange={e => setSubscriberNum(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ marginTop: "20px", fontSize: "1.2rem" }}>Login</button>
            </form>
            <button
                style={{ marginTop: "30px", fontSize: "1.1rem" }}
                onClick={() => navigate('/signup')}
            >
                sign up
            </button>
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
    );
}

export default Login;