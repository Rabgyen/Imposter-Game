import React from "react";
import { useGameContext } from "../context/GameContext";
import { LuUsersRound } from "react-icons/lu";
import { GrPowerReset } from "react-icons/gr";
import { FaRegLightbulb } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

const PlayerList = ({onSubmit}) => {
  const {
    playerList,
    playerCount,
    playerName,
    setPlayerName,
    setPlayerList,
    playerSet,
    playable,
    maxPlayerReached,
    addPlayer,
    reset,
  } = useGameContext();
  return (
    <div className="p-4 w-full bg-[#1a1738] flex flex-col gap-3 rounded-2xl shadow-2xl">
      <div className="flex justify-between">
        <span className="flex items-center gap-1">
          <LuUsersRound className="text-green-500 text-lg" />
          <p className="text-sm">PLayers List</p>
        </span>
        <span
          className="flex items-center gap-1 border border-white p-2 rounded-md shadow-white cursor-pointer"
          onClick={reset}
        >
          <GrPowerReset />
          <p className="text-sm">Reset</p>
        </span>
      </div>
      <div>
        <span className="flex items-center justify-center gap-1 text-xs p-2 rounded-md shadow-white">
          <FaRegLightbulb  className="text-yellow-300"/> <p>Pass device to view roles!</p>
        </span>
      </div>
      <div className="w-full flex gap-2">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addPlayer();
          }}
          className="flex-1 border border-white rounded-md px-2 text-sm"
        />
        <button
          className="py-2 px-4 bg-[#099961] rounded"
          onClick={addPlayer}
        >
          +
        </button>
      </div>
      <div>
        {!playerSet ? (
          <div className="flex items-center justify-center gap-2 text-sm py-2 border border-gray-500 text-gray-500">
            <LuUsersRound />
            <p>Add Player to start</p>
          </div>
        ) : (
          <div className="my-scrollbar grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-2 max-h-73  overflow-y-auto">
            {playerList.map((player, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border border-gray-500 rounded-lg min-w-40 justify-between"
              >
                <span className="flex items-center">
                  {player.emoji} <p className="text-center text-xs sm:text-sm">{player.name}</p>
                </span>
                <button
                  className="text-red-500"
                  onClick={() =>
                    setPlayerList(playerList.filter((_, i) => i !== index))
                  }
                >
                  <FaMinus />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button  onClick={onSubmit} disabled = {!playable} className={`w-full h-10 bg-[#099961] mt-4 cursor-pointer ${playable ? 'bg-[#099961]' : 'bg-green-800 '} disabled:cursor-not-allowed`}>{`Start Game ${playerCount-1} / 99`}</button>
      {!playable && (
        <div className="flex items-center justify-center gap-2 ">
        <FiAlertCircle className="text-yellow-500"/>
        <p className="text-xs opacity-40">Add atleast 3 players</p>
      </div>
      )}
      {maxPlayerReached && (
        <div className="flex items-center justify-center gap-2 ">
        <FiAlertCircle className="text-red-500"/>
        <p className="text-xs opacity-40">Reached Maximum Player Limit</p>
      </div>
      )}
    </div>
  );
};

export default PlayerList;
