"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Opt() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name_category: "",
    name: "",
    img: null,
  });
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      name_category: formData.name_category,
      name: formData.name,
      img: formData.img ? URL.createObjectURL(formData.img) : null,
    };

    try {
      const response = await axios.post("http://localhost:3001/options", formDataToSend);
      console.log("Option added successfully:", response.data);
      setAlert({ type: "success", message: "Option added successfully!" });

      // Save to local storage
      const options = JSON.parse(localStorage.getItem("options")) || [];
      options.push(response.data.data);
      localStorage.setItem("options", JSON.stringify(options));

      // Clear form data
      setFormData({
        category: "",
        name: "",
        img: null,
        name_category: "",
      });
    } catch (error) {
      console.error("Error adding option:", error);
      setAlert({ type: "error", message: "Failed to add option. Please try again later." });
    }
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      img: file,
    });
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch categories on component mount
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/category");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="navbar bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a href="/homepage" className="btn btn-ghost text-xl">
            VOTING
          </a>
        </div>
      </div>
      <div className="d-flex justify-center text-center mt-5 mb-5">
        <h1 className="font-bold text-5xl">Menambahkan Polling</h1>
      </div>

      {alert && (
        <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"} shadow-lg mx-10`}>
          <div>
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-5">
        <button className="btn" onClick={() => document.getElementById("my_modal_2").showModal()}>
          Tambah
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Masukkan pilihan</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control flex justify-center">
                <div className="flex justify-center">
                  <input type="text" placeholder="Search category..." className="input input-bordered" onChange={handleSearchChange} value={searchTerm} />
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <select name="name_category" className="select select-bordered w-full max-w-xs" onChange={handleInputChange} value={formData.category}>
                  <option disabled selected>
                    Pilih Kategori
                  </option>
                  {categories
                    .filter((category) => category.name_category.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((category) => (
                      <option key={category.id_category} value={category.name_category}>
                        {category.name_category}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-2 mt-5 flex justify-center">
                <h1 className="font-bold text-xl">Nama</h1>
              </div>
              <div className="flex justify-center">
                <label className="input input-bordered flex w-96 items-center gap-1 justify-center">
                  <input type="text" name="name" className="grow" placeholder="Isi nama..." value={formData.name} onChange={handleInputChange} />
                </label>
              </div>

              <div className="flex justify-center mt-2 mb-2">
                <h1 className="font-bold text-xl">Gambar</h1>
              </div>
              <div className="flex justify-center">
                <label className="input input-bordered flex w-96 items-center gap-2">
                  <input type="file" className="img" accept="img/*" onChange={handleFileChange} />
                </label>
              </div>

              <br />
              <div className="flex justify-center">
                <button type="submit" className="btn bg-black text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
