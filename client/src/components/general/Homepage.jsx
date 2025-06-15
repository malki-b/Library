import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Homepage.css"; // לא חובה, רק אם תרצי עיצוב חיצוני
import "../../css/Homepage.css"; // אם יש לך עיצוב מותאם אישית
function Homepage() {
  const navigate = useNavigate();


  
  // הקפאת גלילה רק בדף הבית
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);


  return (
    <div className="homepage">
      <h1>Welcome to our library</h1>
      <h2>Information desk and self-service loan</h2>
      <div className="button-group">
        <button
          style={{
            width: "200px",
            height: "80px",
            fontSize: "2rem",
            margin: "30px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/displaybooks")}
        >
          BOOKS
        </button>
        <button
          style={{
            width: "200px",
            height: "80px",
            fontSize: "2rem",
            margin: "30px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/login")}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default Homepage;
