import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/home", { replace: true });
    };

    return (
        <nav style={{ marginBottom: "20px" }} className="nav">
            <button onClick={() => navigate("/subscriber/homepage")}>subscriber home</button>
            <button onClick={() => navigate("/subscriber/lendBook")}>lend book</button>
            <button onClick={() => navigate("/subscriber/returnBook")}>return Book</button>
            <button onClick={() => navigate("/subscriber/lendsHistory")}>Lends History</button>
            <button onClick={() => navigate("/subscriber/payment")}>payment</button>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}