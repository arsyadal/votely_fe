"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", data);
      const accessToken = response.data?.data?.access_token;
      const refreshToken = response.data?.data?.refresh_token;
      const refresh = await axios.post(
        "http://localhost:3001/api/token",
        { token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const newAccessToken = refresh?.data?.data;
      setCookie(null, "access_token", newAccessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      push("/homepage");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Incorrect email or password.");
    }
  };

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold text-black">Login With SSO!</h1>
            <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input {...register("email", { required: true })} type="email" placeholder="email" class="input input-bordered" />
                {errors.email && <p>Email is required.</p>}
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input {...register("password", { required: true })} type="password" placeholder="password" class="input input-bordered" />
                {errors.password && <p>Password is required.</p>}
              </div>
              <p>
                Don't have account?{" "}
                <a href="/register" class="">
                  Register
                </a>
              </p>
              <div class="form-control">
                <button type="submit" class="btn bg-black text-white">
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
