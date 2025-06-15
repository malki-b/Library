import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/home", { replace: true });
    };

    return (
        <nav style={{ marginBottom: "20px" }} className="nav">
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/subscription/lendBook")}>lend book</button>
            <button onClick={() => navigate("/subscription/returnBook")}>return Book</button>
            <button onClick={() => navigate("/subscription/lendsHistory")}>Lends History</button>
            <button onClick={() => navigate("/subscription/payment")}>payment</button>
            <button onClick={() => navigate("/displayBooks")}>display books</button>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}