import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();
    return (
        <nav style={{ marginBottom: "20px" }} className="nav">
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/info")}>Info</button>
            <button onClick={() => navigate("/todos")}>Todos</button>
            <button onClick={() => navigate("/posts")}>Posts</button>
            <button onClick={() => {
                localStorage.removeItem("currentUser");
                navigate("/login");
            }}>Logout</button>
        </nav>
    );
}