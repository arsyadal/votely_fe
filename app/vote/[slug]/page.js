"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export default function Vote({ params }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);
  const { push } = useRouter();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.access_token;

        if (!accessToken) {
          push("/login"); // Redirect to login if access token is not present
          return;
        }

        const response = await axios.get("http://localhost:3001/api/option", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Failed to fetch options. Please try again later.");
      }
    };
    fetchOptions();
  }, [push]);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div>
      {" "}
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="navbar bg-black text-white">
        <div className="navbar-start">
          <a href="#" className="btn btn-ghost text-xl">
            VOTELY
          </a>
        </div>
        <div className="navbar-end"></div>
        My v ote: {params.slug}
      </div>
      <div className="flex justify-center mt-8">
        <h1 className="text-center text-4xl font-bold">LAKUKAN VOTING</h1>
      </div>
      <div className="flex justify-center space-x-4 p-4">
        <div className="card w-96 bg-base-100 shadow-lg">
          <div className="option-list">
            {options.map((option) => (
              <div key={option.id} className="option-item">
                <div className="card-body">
                  <h1 className="text-2xl font-bold mb-4">{option.name}</h1>
                  <p className="mb-4">{option.description}</p>
                  <figure>
                    <img src={option.image_url || "https://img.daisyui.com/images/stock/photo-default.png"} alt={option.name} className="rounded-lg" />
                  </figure>
                  <div className="card-actions mt-4">
                    <a href={``} className="btn btn-neutral w-full">
                      Vote Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
