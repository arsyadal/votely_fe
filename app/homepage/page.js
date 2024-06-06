"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
const Navbar = () => {
  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      await logout();
    }
  };

  return (
    <div className="navbar bg-black text-white">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">VOTELY</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-black">
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a className="text-red" href="#" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [homepageData, setHomepageData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/homepage");
        console.log({ data });
        setHomepageData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <Navbar />
      <br />
      <h1 className="flex justify-center font-bold text-5xl mb-5">Polling Terkini</h1>
      <div className="flex justify-center space-x-4 p-4">
        {homepageData.map(({ category, createdAt, deadline, img, name, poll_id, title, user_id }) => (
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={img} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
              <div className="card-actions justify-end">
                <a href="/vote" className="btn btn-neutral bg-black text-white">
                  Vote Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <a href="/opt" className="btn btn-neutral bg-black text-white">
          Buat Polling
        </a>
      </div>
    </div>
  );
};

export default Homepage;
