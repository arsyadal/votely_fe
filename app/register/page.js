"use client";

import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Menambahkan state untuk name

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        password,
        name, // Menambahkan name ke dalam permintaan
      });

      if (response.data.success) {
        // Registrasi berhasil
        alert("Registration successful!");
        console.log("Registration successful:", response.data.user);
      } else {
        // Registrasi gagal
        alert(`Registration failed: ${response.data.error}`);
        console.error("Registration failed:", response.data.error);
      }
    } catch (error) {
      alert("Error registering user: " + error.message);
      console.error("Error registering user:", error);
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
            <h1 className="text-5xl font-bold text-black">Register now!</h1>
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
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="name" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} required />
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
                    <a href="/login" className="label-text-alt link link-hover">
                      Have account?
                    </a>
                  </div>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-neutral bg-black text-white">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
