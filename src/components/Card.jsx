import React, { useState, useEffect, useRef } from "react";
import { usePlayerListContext } from "../context/GameContext";
import { FaRegLightbulb } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import { VscDebugStart } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Card = () => {
  const [flipped, setFlipped] = useState(false);
  const { playerList, gameStarted, nextPlayer, currentPlayerIndex, randomWordGenerator, imposter, startGame, setGameStarted, setRenderComponent, setCurrentPlayerIndex } = usePlayerListContext();
  const [gameWord, setGameWord] = useState("");
  const [imposterNumber, setImposterNumber] = useState(null);
  const [imposterName, setImposterName] = useState("");
  const [imposterRevealed, setImposterRevealed] = useState(false);

  const startNewGame = () => {
    setGameWord("");
    setGameStarted(false);
    setImposterNumber(null);
    setImposterName("");  
    setImposterRevealed(false);
    setRenderComponent(true);
    setCurrentPlayerIndex(0)
  }
 
  useEffect(() => {
    const getRandomWord = randomWordGenerator();
    const getImposter = imposter();
    setGameWord(getRandomWord);
    setImposterNumber(getImposter);
    setImposterName(playerList[getImposter]?.name || "");
  }, [])

  const revealImposter = () => {
    setImposterRevealed(true);
  }


  return (
    <div className="p-4  bg-[#1a1738] flex flex-col gap-3 rounded-2xl shadow-2xl cursor-pointer">
      <span className="flex items-center justify-center gap-1 text-xs p-2 rounded-md shadow-white">
        <FaRegLightbulb className="text-yellow-300" />{" "}
        <p>Pass device to view roles!</p>
      </span>
      <span className="flex items-center justify-center gap-1 text-xs p-2 rounded-md shadow-white">
        <TbHandClick className="text-green-500" />{" "}
        <p>Click the card below to reveal your role</p>
      </span>
      {!gameStarted ? (<div
        className={`h-80 w-66 border-2 border-white flex items-center justify-center flex-col gap-2 transition-transform ${
          flipped ? "transform-[rotateY(180deg)]" : ""
        } rounded-2xl`}
        onClick={() => setFlipped(!flipped)}
      >
        {!flipped ? (
          <>
            <h1 className="font-bold text-3xl text-center">
              {playerList[currentPlayerIndex]?.name || ""}
            </h1>
          </>
        ) : (
          <>
            <p
              className={`font-semibold text-2xl text-center ${
                flipped ? "transform-[rotateY(180deg)]" : ""
              } ${(currentPlayerIndex == imposterNumber) ? "text-red-500" : "text-white"}`}
            >
              {(currentPlayerIndex == imposterNumber) ? "Your are the Imposter": `${gameWord}`}
            </p>
          </>
        )}
      </div>): (
        <button onClick={revealImposter} className="flex gap-2 items-center justify-center w-full py-2 bg-[#334155] rounded"><FaRegEye />{!imposterRevealed ? ("Reveal the imposter") : (`${imposterName}`)}</button>
      )}
      {(currentPlayerIndex < playerList.length - 1) ? (
        <button
          onClick={nextPlayer}
          className="flex items-center justify-center gap-1.5 py-2 bg-[#099961] rounde"
        >
          <FaRegUser /> Next Player{" "}
        </button>
      ) : (
        <div>
          {!gameStarted ? (<button onClick={startGame}
          className="flex w-full items-center justify-center gap-1.5 py-2 bg-[#099961] rounded"
        >
          <VscDebugStart /> Start Game
        </button>) : (<button onClick={startNewGame}
          className="flex w-full items-center justify-center gap-1.5 py-2 bg-[#099961] rounded"
        >
          <VscDebugStart /> Start New Game
        </button>)}
        </div>
      )}
    </div>
  );
};

export default Card;
