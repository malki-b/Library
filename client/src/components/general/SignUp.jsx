import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        numOfFamilyMembers: ""
    });
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        const body = {
            ...form,
            numOfFamilyMembers: Number(form.numOfFamilyMembers),
            role: "subscriber",
            debt: 0
        };

        try {
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                const data = await res.json();
                console.log("SERVER RESPONSE:", data);
                setSuccessMsg(`נרשמת בהצלחה! מספר המנוי שלך הוא: ${data.subscriberNum}. שמור אותו כדי להתחבר.`);
                setForm({
                    name: "",
                    email: "",
                    address: "",
                    numOfFamilyMembers: ""
                });
            } else {
                const data = await res.json();
                setError(data.error || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Server error. Please try again.");
        }
    }

    return (
        <div className='page backgroundImagePage'>
            <h1  className="whiteText">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:<br />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>Email:<br />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>Address:<br />
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>Number of family members:<br />
                        <input
                            type="number"
                            name="numOfFamilyMembers"
                            value={form.numOfFamilyMembers}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ marginTop: "20px", fontSize: "1.1rem" }}>Register</button>
            </form>
            <button
                style={{ marginTop: "30px", fontSize: "1.1rem" }}
                onClick={() => navigate('/login')}>back to login</button>
            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default SignUp;