import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
    useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="page backgroundImagePage">
      <h1  className="whiteText">Welcome to our library</h1>
      <h2  className="whiteText">Information desk and self-service loan</h2>
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
