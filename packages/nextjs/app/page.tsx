"use client";

import { useState } from "react";
import type { NextPage } from "next";
import Modal from "~~/components/Modal";
import BetHistory from "~~/components/bets/BetHistory";
import CreateBet from "~~/components/bets/CreateBet";

const Home: NextPage = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex sm:flex-col pt-16 py-8 gap-32 bg-gradient-to-t from-[#083A5B] to-[#27262C]">
        {/* Modal */}
        {isModalOpen ? (
          <div className="relative flex bg-white/10">
            <button onClick={closeModal} className="absolute">
              close
            </button>
            <CreateBet />
          </div>
        ) : null}
        {/* <div className="rounded-3xl border border-black" style={{ flex: 2, width: "20%" }}>
          <CreateBet />
        </div> */}
        <div className="rounded-3xl border border-black">
          {/* Button to open modal */}
          <button onClick={openModal}>Open Modal</button>
        </div>
        <div className="rounded-3xl border border-white" style={{ flex: 5, width: "70%" }}>
          <BetHistory />
        </div>
      </div>
    </>
  );
};

export default Home;
