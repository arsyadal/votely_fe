export default function Login() {
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

        <div className="navbar-end"></div>
      </div>

      <div class="flex justify-center space-x-4 p-4">
        <div class="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">BATMAN VS SUPERMAN!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <a href="/vote" class="btn bg-black text-white">
                Vote Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <a href="/opt" class="btn bg-black text-white">
          Buat Polling
        </a>
      </div>
    </div>
  );
}
