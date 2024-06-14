"use client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from "react"

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async ({ email, password, name }) => {
    try {
      const { data } = await axios.post("http://localhost:3001/register", {
        email, password, name
      })
      console.log({ data })
      alert('Berhasil register')
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setErrorMessage('No response received from server');
      } else {
        console.error('Error message:', error.message);
        setErrorMessage('An error occurred while setting up the request');
      }
    }
  }

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
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input {...register("name", { required: true })} type="text" placeholder="username" className="input input-bordered" />
                {errors.name && <span className="text-red-500">Username is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input {...register("password", { required: true })} type="password" placeholder="password" className="input input-bordered" />
                {errors.password && <span className="text-red-500">Password is required</span>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                  <div>
                    <a href="/login" className="label-text-alt link link-hover">
                      Have an account?
                    </a>
                  </div>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-black text-white" type="submit">Register</button>
              </div>
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
