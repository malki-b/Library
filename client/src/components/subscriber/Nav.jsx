// import { useNavigate } from "react-router-dom";
// import "../../css/nav.css";

// export default function Nav() {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem("currentUser");
//         navigate("/home", { replace: true });
//     };

//     return (
//         <nav style={{ marginBottom: "20px" }} className="nav">
//             <button onClick={() => navigate("/subscriber/homepage")}>subscriber home</button>
//             <button onClick={() => navigate("/subscriber/lendBook")}>lend book</button>
//             <button onClick={() => navigate("/subscriber/returnBook")}>return Book</button>
//             <button onClick={() => navigate("/subscriber/lendsHistory")}>Lends History</button>
//             <button onClick={() => navigate("/subscriber/payment")}>payment</button>
//             <button onClick={handleLogout}>Logout</button>
//         </nav>
//     );
// }

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









// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "../../css/Nav.css";

// export default function Nav() {
//   const navigate = useNavigate();
//   const [activeButton, setActiveButton] = useState(null); // הכפתור הפעיל

//   const handleClick = (path) => {
//     setActiveButton(path);         // עדכון כפתור פעיל
//     navigate(path);                // מעבר לדף
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setActiveButton(null); // איפוס הבחירה
//     navigate("/home", { replace: true });
//   };

//   return (
//     <nav className="nav">
//       <button
//         className={activeButton === "/subscriber/homepage" ? "active" : ""}
//         onClick={() => handleClick("/subscriber/homepage")}
//       >
//         subscriber home
//       </button>
//       <button
//         className={activeButton === "/subscriber/lendBook" ? "active" : ""}
//         onClick={() => handleClick("/subscriber/lendBook")}
//       >
//         lend book
//       </button>
//       <button
//         className={activeButton === "/subscriber/returnBook" ? "active" : ""}
//         onClick={() => handleClick("/subscriber/returnBook")}
//       >
//         return Book
//       </button>
//       <button
//         className={activeButton === "/subscriber/lendsHistory" ? "active" : ""}
//         onClick={() => handleClick("/subscriber/lendsHistory")}
//       >
//         Lends History
//       </button>
//       <button
//         className={activeButton === "/subscriber/payment" ? "active" : ""}
//         onClick={() => handleClick("/subscriber/payment")}
//       >
//         payment
//       </button>
//       <button onClick={handleLogout}>Logout</button>
//     </nav>
//   );
// }
