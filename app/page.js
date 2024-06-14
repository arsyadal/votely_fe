export default function Home() {
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="navbar bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a className="btn btn-ghost text-xl" href="#">
            VOTELY
          </a>
        </div>
      </div>
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">MARI LAKUKAN VOTING</h1>
            <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <a href="/login" class="btn btn-black bg-black text-white">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
