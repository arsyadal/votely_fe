"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";

export default function Opt() {
  const [categories, setCategories] = useState([]);

  // Fungsi untuk mendapatkan data kategori dan memperbarui state
  useEffect(() => {
    const { access_token } = parseCookies();
    (async () => {
      const { data } = await axios.get("http://localhost:3001/api/category", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setCategories(data?.data || []);
    })();
  }, []);

  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <div class="navbar bg-black text-white">
        <div class="navbar-start">
          <div class="dropdown"></div>
          <a href="/homepage" class="btn btn-ghost text-xl">
            VOTING
          </a>
        </div>
      </div>
      <div class="d-flex justify-center text-center mt-5 mb-5">
        <h1 class="font-bold text-5xl">Menambahkan Polling</h1>
      </div>

      <div class="flex justify-center">
        <button
          class="btn"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Tambah
        </button>
        <button className="btn ml-3" onClick={()=>document.getElementById('my_modal_2').showModal()}>Tambah Kategori</button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Tambah Kategori</h3>
    <input type="text" placeholder="Tambah kategori" class="input w-full max-w-xs" />
    <button class="btn bg-black text-white ml-3">Submit</button>


    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>        
        <dialog id="my_modal_2" class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Masukkan pilihan</h3>

            <div class="form-control flex justify-center">
              <div class="flex justify-center">
                <select
                  id="category"
                  class="select select-bordered w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih Kategori
                  </option>
                  {/* Render opsi dropdown berdasarkan data kategori */}
                  {categories.map((category) => (
                    <option
                      key={category.id_category}
                      value={category.id_category}
                    >
                      {category.name_category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div class="mb-2 mt-5 flex justify-center">
              <h1 class="font-bold text-xl">Nama</h1>
            </div>
            <div class="flex justify-center">
              <label class="input input-bordered flex w-96 items-center gap-1 justify-center">
                <input type="text" class="grow" placeholder="Isi nama..." />
              </label>
            </div>

            <div class="flex justify-center mt-2 mb-2">
              <h1 class="font-bold text-xl">Gambar</h1>
            </div>
            <div class="flex justify-center">
              <label class="input input-bordered flex w-96 items-center gap-2">
                <input
                  type="file"
                  class="grow"
                  accept="image/*"
                  placeholder="Upload Photo"
                />
              </label>
            </div>

            {/* Deadline Input */}
            <div class="mb-2 mt-5 flex justify-center">
              <h1 class="font-bold text-xl">Deadline</h1>
            </div>
            <div class="flex justify-center">
              <label class="input input-bordered flex w-96 items-center gap-2">
                <input type="datetime-local" class="grow" />
              </label>
            </div>

            <br />
            <div class="flex justify-center">
              <button class="btn bg-black text-white">Submit</button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
