import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();
    return (
        <nav style={{ marginBottom: "20px" }} className="nav">
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/manager/users")}>users</button>
            <button onClick={() => navigate("/manager/lends")}>lends</button>
            <button onClick={() => navigate("/manager/books")}>books</button>
            <button onClick={() => {
                localStorage.removeItem("currentUser");
                navigate("/login");
            }}>Logout</button>
        </nav>
    );
}