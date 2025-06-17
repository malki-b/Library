import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/register.css';
import { POST } from './queries';
import { Context } from './Routers';
function SignUp() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        numOfFamilyMembers: ""
    });
    const [user, setUser] = useContext(Context)
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

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
            debt: 20
        };

        try {
            const createdUser = await POST("http://localhost:3000/users", body)
            setUser(createdUser)
            setSuccessMsg(`You were registered successfully! your subscriber number is ${createdUser.subscriberNum}. \n You have to pay 20 NIS.`);
            setForm({
                name: "",
                email: "",
                address: "",
                numOfFamilyMembers: ""
            });
            setShowModal(true);

        } catch {
            setError("Registering was failed, try again");
        }
    }

    return (
        <div className='page backgroundImagePage'>
            <h1 className="whiteText">Sign Up</h1>
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
            {/* {successMsg && <p className="success">{successMsg}</p>} */}
            {error && <p className="error">{error}</p>}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{successMsg}</p>
                        <button onClick={() => navigate('/subscriber/payment')}>אישור</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SignUp;