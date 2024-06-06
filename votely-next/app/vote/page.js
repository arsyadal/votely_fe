"use client";

import React, { useState, useEffect } from "react";

function VoteCard({ onVote }) {
  // Initialize state for votes
  const [votes, setVotes] = useState([0, 0]);

  // Function to handle vote increment
  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
    if (onVote) {
      onVote();
    }
  };

  // Calculate total votes
  const totalVotes = votes.reduce((acc, curr) => acc + curr, 0);

  // Calculate percentage of votes for each option
  const percentageVotes0 = (votes[0] / totalVotes) * 100;
  const percentageVotes1 = (votes[1] / totalVotes) * 100;

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="navbar bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a className="btn btn-ghost text-xl" href="/homepage">
            VOTELY
          </a>
        </div>

        <div className="navbar-end"></div>
      </div>
      <div className="flex justify-center bg-base-200 space-x-4 p-4">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">BATMAN</h2>
            <progress className="progress progress-black w-56" value={percentageVotes0} max="100"></progress>

            <p>Votes: {votes[0]}</p>
            <div className="card-actions justify-center">
              <button className="btn bg-black text-white" onClick={() => handleVote(0)}>
                Pilih
              </button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">SUPERMAN</h2>
            <progress className="progress progress-black w-56" value={percentageVotes1} max="100"></progress>

            <p>Votes: {votes[1]}</p>
            <div className="card-actions justify-center">
              <button className="btn bg-black text-white" onClick={() => handleVote(1)}>
                Pilih
              </button>

              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Selamat !</h3>
                  <p className="py-4">Anda berhasil memilih, Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max flex justify-center">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl" id="days">
            <span style={{ "--value": 15 }}></span>
          </span>
          days
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl" id="hours">
            <span style={{ "--value": 10 }}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl" id="minutes">
            <span style={{ "--value": 24 }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl" id="seconds">
            <span style={{ "--value": 54 }}></span>
          </span>
          sec
        </div>
      </div>

      <br />
      <h1 className="flex justify-center">Vote end: 3 May 2024 23:59 PM</h1>
      <h2 id="currentTime"></h2>

      <br />
      <h1 className="flex justify-center">TOTAL VOTES: {totalVotes}</h1>
      <br />
    </div>
  );
}

export default VoteCard;