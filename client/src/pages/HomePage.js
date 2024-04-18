import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/bg.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div className="card w-25">
          <img src="/assets/images/logo.png" alt="logo" />
          <hr />
          <div className="card-body" style={{ marginTop: "-60px" }}>
            <h5 className="card-title">Indias No #1 career Platform</h5>
            <p className="card-text">
              Search and Manage your Jobs with ease....free and Open Source from
              NodeJs
            </p>
            <div className="d-flex justify-content-between mt-5">
              <p>
                Not a New User <Link to="/register"> Here!</Link>
              </p>
              <p>
                <Link to="/login" className="mybtn">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
