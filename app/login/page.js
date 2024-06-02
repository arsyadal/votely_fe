"use client";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform login process here
      console.log("Login process with SSO...");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="navbar bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a href="/homepage" className="btn btn-ghost text-xl">
            VOTELY
          </a>{" "}
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end"></div>
      </div>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-black">Login With SSO!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                  <div>
                    <a href="/register" className="label-text-alt link link-hover">
                      Don't have an account?
                    </a>
                  </div>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-neutral bg-black text-white">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
