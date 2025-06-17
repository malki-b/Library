import { useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/home", { replace: true });
    };

        function isActive(path) {
        return location.pathname === path ? 'active' : '';
    }

    return (
        <nav className="nav">
            <button className={isActive('/manager/homepage')} onClick={() => navigate("/manager/homepage")}>manager home</button>
            <button className={isActive('/manager/users')} onClick={() => navigate("/manager/users")}>users</button>
            <button className={isActive('/manager/lends')} onClick={() => navigate("/manager/lends")}>lends</button>
            <button className={isActive('/manager/books')} onClick={() => navigate("/manager/books")}>books</button>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}