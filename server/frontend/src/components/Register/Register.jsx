import React, { useState } from "react";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [err, setErr] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("/djangoapp/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password, firstName, lastName, email }),
    });
    const json = await response.json();
    if (json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
      window.location.href = "/";
    } else if (json.error === "Already Registered") {
      setErr("A user with that username is already registered.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card border-0 shadow-sm rounded-4 p-4 mt-4">
          <h3 className="fw-bold text-center mb-1">Create Account</h3>
          <p className="text-muted text-center mb-4">Sign up to get started</p>

          {err && (
            <div className="alert alert-danger py-2" role="alert">
              {err}
            </div>
          )}

          <form onSubmit={register}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 fw-semibold text-white"
              style={{ background: "#0f3460", borderRadius: "8px", padding: "10px" }}
            >
              Register
            </button>
          </form>

          <p className="text-center text-muted mt-3 mb-0">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none fw-semibold">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
