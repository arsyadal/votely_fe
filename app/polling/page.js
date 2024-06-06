"use client";

import React, { useState } from "react";

const Homepage = () => {
  const [pollingData, setPollingData] = useState({
    category: "",
    title: "",
    name: "",
    img: "",
    deadline: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPollingData({ ...pollingData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/polling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pollingData)
      });
      if (response.ok) {
        // Reset form setelah berhasil menambahkan polling
        setPollingData({
          category: "",
          title: "",
          name: "",
          img: "",
          deadline: ""
        });
        alert("Polling added successfully");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to add polling");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {/* Konten lainnya */}
      
      {/* Form untuk menambahkan polling */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="category" placeholder="Category" value={pollingData.category} onChange={handleInputChange} />
        <input type="text" name="title" placeholder="Title" value={pollingData.title} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={pollingData.name} onChange={handleInputChange} />
        <input type="text" name="img" placeholder="Image URL" value={pollingData.img} onChange={handleInputChange} />
        <input type="text" name="deadline" placeholder="Deadline" value={pollingData.deadline} onChange={handleInputChange} />
        <button type="submit">Add Polling</button>
      </form>
    </div>
  );
};

export default Homepage;
