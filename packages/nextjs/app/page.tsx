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
      <div className="flex sm:flex-col gap-32 bg-gradient-to-t from-[#083A5B] to-[#27262C] h-screen">
        {/* Modal */}
        <div
          className={`z-10 fixed top-0 left-0 w-full h-full flex justify-center backdrop-blur-md items-center bg-black bg-opacity-50 transition-opacity ${
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-black backdrop-blur-md rounded-lg p-8 transform transition-transform duration-500 w-1/2">
            {isModalOpen && (
              <div className="relative">
                <button onClick={closeModal} className="absolute top-0 left-0 m-2 text-white rotate-45">
                  <button title="Add New" class="group cursor-pointer outline-none hover:rotate-90 duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50px"
                      height="50px"
                      viewBox="0 0 24 24"
                      class="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke-width="1.5"
                      ></path>
                      <path d="M8 12H16" stroke-width="1.5"></path>
                      <path d="M12 16V8" stroke-width="1.5"></path>
                    </svg>
                  </button>
                </button>
                <CreateBet />
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className="my-4 flex flex-col items-center gap-2 justify-center">
            <div className="flex">
              <div className="text-[56px] font-bold">
                It's time{" "}
                <span className="text-[56px] font-extrabold bg-gradient-to-r from-blue-700 to-purple-400 text-transparent bg-clip-text">
                  to duel.
                </span>
              </div>
            </div>
            {/* Button to open modal */}
            <button onClick={openModal}>
              <button className="uppercase relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-purple-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                create a bet
              </button>
            </button>
          </div>
          <BetHistory />
        </div>
      </div>
    </>
  );
};

export default Home;
