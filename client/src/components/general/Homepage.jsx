import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Homepage.css"; // לא חובה, רק אם תרצי עיצוב חיצוני

function Homepage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home</h1>
      <button
        style={{
          width: "200px",
          height: "80px",
          fontSize: "2rem",
          margin: "30px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/sisplaybooks")}
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
  );
}

export default Homepage;
