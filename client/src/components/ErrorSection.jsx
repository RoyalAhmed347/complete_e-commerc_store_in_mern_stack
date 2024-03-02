import React from "react";
import { Link } from "react-router-dom";

const ErrorSection = () => {
  return (
    <div className="container">
      <div className="error">
        <h1 className="main_heading">404</h1>
        <h2 className="sub_heading">UH OH! You're lost.</h2>
        <p className="text">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <Link to="/">
          <button className="btn"> Go To Home </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorSection;
