import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/home", { replace: true });
    };

    return (
        <nav style={{ marginBottom: "20px" }} className="nav">
            <button onClick={() => navigate("/manager/homepage")}>manager home</button>
            <button onClick={() => navigate("/manager/users")}>users</button>
            <button onClick={() => navigate("/manager/lends")}>lends</button>
            <button onClick={() => navigate("/manager/books")}>books</button>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}