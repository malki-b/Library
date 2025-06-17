import { useNavigate, useLocation } from "react-router-dom";
import "../../css/nav.css";

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/home", { replace: true });
    };

    function isActive(path) {
        return location.pathname === path ? 'active' : '';
    }

    return (
        <nav className="nav">
            <button className={isActive("/subscriber/homepage")} onClick={() => navigate("/subscriber/homepage")}>subscriber home</button>
            <button className={isActive("/subscriber/lendBook")} onClick={() => navigate("/subscriber/lendBook")}>lend book</button>
            <button className={isActive("/subscriber/returnBook")} onClick={() => navigate("/subscriber/returnBook")}>return Book</button>
            <button className={isActive("/subscriber/lendsHistory")} onClick={() => navigate("/subscriber/lendsHistory")}>Lends History</button>
            <button className={isActive("/subscriber/payment")} onClick={() => navigate("/subscriber/payment")}>payment</button>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}