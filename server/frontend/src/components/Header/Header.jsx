import React, { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    if (storedUser) setUserName(storedUser);
  }, []);

  const logout = async () => {
    const res = await fetch("/djangoapp/logout/", { method: "GET" });
    const json = await res.json();
    if (json.userName === "") {
      sessionStorage.removeItem("username");
      setUserName("");
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bestcars-nav">
      <div className="container">
        <a className="navbar-brand" href="/">&#128663; Best Cars Dealership</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/static/About.html">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/static/Contact.html">Contact</a>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            {userName ? (
              <>
                <span className="text-white fw-semibold me-2">
                  &#128100; {userName}
                </span>
                <button className="btn btn-outline-light btn-sm" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="btn btn-outline-light btn-sm">Login</a>
                <a href="/register" className="btn btn-light btn-sm text-dark fw-semibold">Register</a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
