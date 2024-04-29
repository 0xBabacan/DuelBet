import React, { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

// REGEX for number inputs (only allow numbers and a single decimal point)
export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const CreateBet = () => {
  const [targetPrice, setTargetPrice] = useState("");
  const [isHigherChosen, setIsHigherChosen] = useState(true);
  const [targetTimestamp, setTargetTimestamp] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [betAmount, setBetAmount] = useState<string>("");

  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);

  const { writeAsync: createBet } = useScaffoldContractWrite({
    contractName: "DuelContract",
    functionName: "createBet",
    value: NUMBER_REGEX.test(betAmount) ? parseEther(betAmount) : betAmount,
    args: [
      NUMBER_REGEX.test(targetPrice) ? parseEther(targetPrice) : targetPrice,
      isHigherChosen,
      BigInt(targetTimestamp),
    ],
  });

  const convertToTimestamp = dateTimeString => {
    setTargetDate(dateTimeString);
    const selectedDateTime = new Date(dateTimeString);
    const timestamp = Math.floor(selectedDateTime.getTime() / 1000); // Milliseconds to seconds conversion
    setTargetTimestamp(timestamp.toString());
  };

  return (
    <div className="px-8 py-12 space-y-3 text-white">
      <div className="text-center mb-4">
        <span className="block text-2xl font-bold">Create a bet!</span>
      </div>
      <div className="flex flex-row items-center">
        <div className="w-full text-l">ETH price:</div>
        <input
          placeholder={nativeCurrencyPrice}
          id="targetPrice"
          type="number"
          value={targetPrice}
          onChange={e => setTargetPrice(e.target.value.toString())}
          style={{
            width: "80px",
            background: "transparent",
            border: "1px solid #EBF5FF",
            borderRadius: "8px",
            ring: "1px solid indigo",
            ringColor: "indigo",
            paddingLeft: "6px",
            outline: "none",
          }}
        />
      </div>
      <div className="flex flex-row">
        <div className="w-full text-l">Bet amount:</div>
        <input
          placeholder="10.00"
          type="number"
          value={betAmount}
          onChange={e => setBetAmount(e.target.value)}
          style={{
            background: "transparent",
            width: "80px",
            border: "1px solid #EBF5FF",
            borderRadius: "8px",
            ring: "1px solid indigo",
            ringColor: "indigo",
            paddingLeft: "6px",
            outline: "none",
          }}
        />
      </div>
      <div className="flex flex-row">
        <div className="w-full text-l">Deadline:</div>
        <input
          type="datetime-local"
          onChange={e => convertToTimestamp(e.target.value)}
          style={{
            background: "transparent",
            width: "100%",
            border: "1px solid #EBF5FF",
            borderRadius: "8px",
            ring: "1px solid indigo",
            ringColor: "indigo",
            paddingLeft: "6px",
            outline: "none",
          }}
        />
      </div>
      <div className="flex flex-row">
        <div className="w-full text-l">Price movement:</div>
        <div style={{ fontSize: "0.9em", display: "flex", justifyContent: "flex-end" }}>
          <button
            className={`bg-gray-200 px-2 py-1 rounded-lg text-gray-700 hover:bg-purple-400 ${
              isHigherChosen ? "font-bold bg-purple-400" : ""
            }`}
            onClick={() => setIsHigherChosen(true)}
          >
            Higher
          </button>
          <button
            className={`ml-2 bg-gray-200 px-2 py-1 rounded-lg text-gray-700 hover:bg-purple-400 ${
              !isHigherChosen ? "font-bold bg-purple-400" : ""
            }`}
            onClick={() => setIsHigherChosen(false)}
          >
            Lower
          </button>
        </div>
      </div>
      <div className="flex text-center font-bold" style={{ marginTop: "40px" }}>
        {targetPrice && targetDate
          ? `ETH price will be ${isHigherChosen ? "higher" : "lower"} than ${targetPrice} at ${targetDate}.`
          : ""}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button
          className="btn text-white h-[3rem] min-h-[3rem] relative bg-gradient-to-r from-blue-700 to-purple-400 hover:scale-110"
          onClick={() => createBet()}
        >
          Create your bet!
        </button>
      </div>
      <div className="!mt-8 gap-2 flex flex-col border border-yellow-300 bg-yellow-300/30 rounded p-2">
        <div className="flex text-sm items-center font-bold">⚠ PLEASE NOTE</div>
        <div className="text-xs">
          Using chainlink in Sepolia Network to get the price cannot promise the price data at the target timestamp is
          the latest because the data feed will be updated if the price alternates more than the deviation threshold.
          Therefore, we apologize in advance for any potential losses that may occur due to this situation. Have fun!
        </div>
      </div>
    </div>
  );
};

export default CreateBet;
