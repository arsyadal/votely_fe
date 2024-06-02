export default function Register() {
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <div class="navbar bg-black text-white">
        <div class="navbar-start">
          <div class="dropdown"></div>
          <a href="/homepage" class="btn btn-ghost text-xl">
            VOTELY
          </a>{" "}
        </div>
        <div class="navbar-center hidden lg:flex"></div>
        <div class="navbar-end"></div>
      </div>

      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold text-black">Register now!</h1>
            <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="name" placeholder="username" class="input input-bordered" required />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" class="input input-bordered" required />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" class="input input-bordered" required />
                <label class="label">
                  <a href="#" class="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                  <div>
                    <a href="/login" class="label-text-alt link link-hover">
                      Have account?
                    </a>
                  </div>
                </label>
              </div>
              <div class="form-control mt-6">
                <button class="btn bg-black text-white">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
