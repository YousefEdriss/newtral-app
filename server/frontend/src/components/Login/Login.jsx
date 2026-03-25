import React, { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("/djangoapp/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });
    const json = await response.json();
    if (json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
      window.location.href = "/";
    } else {
      setErr("Invalid username or password.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card border-0 shadow-sm rounded-4 p-4 mt-5">
          <h3 className="fw-bold text-center mb-1">Welcome Back</h3>
          <p className="text-muted text-center mb-4">Log in to your account</p>

          {err && (
            <div className="alert alert-danger py-2" role="alert">
              {err}
            </div>
          )}

          <form onSubmit={login}>
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
            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
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
              Login
            </button>
          </form>

          <p className="text-center text-muted mt-3 mb-0">
            Don't have an account?{" "}
            <a href="/register" className="text-decoration-none fw-semibold">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
