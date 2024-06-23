"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Opt() {
  const [categories, setCategories] = useState([]);
  // const [polling setPolling] = useState([]); // [{}
  const [successAlert, setSuccessAlert] = useState(false);
  const { access_token } = parseCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerPolling,
    handleSubmit: handleSubmitPolling,
    formState: { errors: errorsPolling },
  } = useForm();

  const [ownerId, setOwnerId] = useState();

  const {
    register: registerOption,
    handleSubmit: handleSubmitOption,
    formState: { errors: errorsOption },
  } = useForm();

  const { refresh } = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3001/api/category", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setCategories(data?.data || []);
    })();
  }, []);

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/polling/:polling_id/option", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        console.log("Polling data:", data?.data);
        setPolling(data?.data || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchData();
  }, [access_token]);

  const onSubmitCategory = async ({ category }) => {
    try {
      await axios.post(
        "http://localhost:3001/api/category",
        { category_name: category },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setSuccessAlert(true);
      refresh();
    } catch (error) {
      console.error("Create category error:", error);
      alert("Create category failed!");
    }
  };

  const onSubmitPolling = async ({ name, image_url, description, deadline_at, category_id }) => {
    console.log({ name, image_url, description, deadline_at, category_id });
    try {
      await axios.post(
        "http://localhost:3001/api/polling",
        { name, image_url, description, deadline_at, category_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (error) {
      console.error("Create polling error:", error);
      alert("Create polling failed!");
    }
    setSuccessAlert(true);
    refresh();
  };

  const onSubmitOption = async ({ image_url, name, owner_id, polling_id }) => {
    console.log({ image_url, name, owner_id, polling_id });

    try {
      await axios.post(
        "http://localhost:3001/api/polling/2/option/",
        { image_url, name, owner_id, polling_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (error) {
      console.error("Create polling error:", error);
      alert("Create polling failed!");
    }
    setSuccessAlert(true);
    refresh();
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
          </a>
        </div>
      </div>
      <div className="d-flex justify-center text-center mt-5 mb-5">
        <h1 className="font-bold text-5xl">Menambahkan Polling</h1>
      </div>
      <div className="flex justify-center">
        <button className="btn" onClick={() => document.getElementById("my_modal_3").showModal()}>
          Tambah Poling
        </button>
        <button className="btn ml-3" onClick={() => document.getElementById("my_modal_2").showModal()}>
          Tambah Kategori
        </button>
        <button className="btn ml-3" onClick={() => document.getElementById("my_modal_4").showModal()}>
          Tambah Option
        </button>

        <dialog id="my_modal_2" className="modal">
          <form className="modal-box" onSubmit={handleSubmit(onSubmitCategory)}>
            <h3 className="font-bold text-lg">Tambah Kategori</h3>
            <input {...register("category", { required: true })} type="text" placeholder="Tambah kategori" className="input w-full max-w-xs" />
            <button className="btn bg-black text-white ml-3" type="submit">
              Submit
            </button>
            <p className="py-4">Press ESC key or click outside to close</p>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="my_modal_3" className="modal">
          <form className="modal-box" onSubmit={handleSubmitPolling(onSubmitPolling)}>
            <h3 className="font-bold text-lg">Masukkan pilihan</h3>
            <div className="form-control flex justify-center">
              <div className="flex justify-center">
                <select {...registerPolling("category_id")} className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Pilih Kategori
                  </option>
                  {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-2 mt-5 flex justify-center">
              <h1 className="font-bold text-xl">Nama</h1>
            </div>
            <div className="flex justify-center">
              <label className="input input-bordered flex w-96 items-center gap-1 justify-center">
                <input {...registerPolling("name")} type="text" className="grow" placeholder="Isi nama..." />
              </label>
            </div>
            <div className="mb-2 mt-5 flex justify-center">
              <h1 className="font-bold text-xl">Deskripsi</h1>
            </div>
            <div className="flex justify-center">
              <label className="input input-bordered flex w-96 items-center gap-1 justify-center">
                <input {...registerPolling("description")} type="text" className="grow" placeholder="Isi deskripsi..." />
              </label>
            </div>

            <div className="flex justify-center mt-2 mb-2">
              <h1 className="font-bold text-xl">Gambar</h1>
            </div>
            <div className="flex justify-center">
              <label className="input input-bordered flex w-96 items-center gap-2">
                <input {...registerPolling("image_url")} type="text" className="grow" />
              </label>
            </div>
            {/* Deadline Input */}
            <div class="mb-2 mt-5 flex justify-center">
              <h1 class="font-bold text-xl">Deadline</h1>
            </div>
            <div class="flex justify-center">
              <label class="input input-bordered flex w-96 items-center gap-2">
                <input {...registerPolling("deadline_at")} type="datetime-local" class="grow" />
              </label>
            </div>
            <br />
            <div className="flex justify-center">
              <button className="btn bg-black text-white" type="submit">
                Submit
              </button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="my_modal_4" className="modal">
          <form className="modal-box" onSubmit={handleSubmitOption(onSubmitOption)}>
            <h3 className="font-bold text-lg">Buat option</h3>
            <div className="mb-2 mt-5 flex justify-center">
              <h1 className="font-bold text-xl"></h1>
            </div>
            <div className="mb-2 mt-5 flex justify-center">
              <h1 className="font-bold text-xl">Nama</h1>
            </div>
            <div className="flex justify-center">
              <label className="input input-bordered flex w-96 items-center gap-1 justify-center">
                <input {...registerOption("name")} type="text" className="grow" placeholder="Isi nama..." />
              </label>
            </div>
            {/* <div className="mb-2 mt-5 flex justify-center">owner id</div>
            <div className="flex justify-center">
              <label className="input input-bordered flex w-96 items-center gap-1 justify-center">
                <input {...registerOption("owner_id")} type="text" className="grow" />
              </label>
            </div> */}

            <div className="flex justify-center mt-2 mb-2">
              <h1 className="font-bold text-xl">Gambar</h1>
            </div>
            <div className="flex justify-center">
              <label className="input input-bordered flex w-96 items-center gap-2">
                <input {...registerOption("image_url")} type="text" className="grow" />
              </label>
            </div>
            <br />
            <div className="flex justify-center">
              <button className="btn bg-black text-white" type="submit">
                Submit
              </button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      {successAlert && (
        <div className="alert alert-success fixed bottom-4 right-4 shadow-lg">
          <div>
            <span>Data berhasil ditambahkan!</span>
            <button onClick={() => setSuccessAlert(false)} className="btn btn-sm btn-circle btn-ghost ml-2">
              ✕
            </button>
          </div>
        </div>
      )}
      ;
    </div>
  );
}
