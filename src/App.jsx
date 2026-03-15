import React, { useState } from "react";
import Card from "./components/Card";
import PlayerList from "./components/PlayerList";
import { usePlayerListContext } from "./context/GameContext";

const App = () => {
  const {renderComponent, setRenderComponent}= usePlayerListContext();

  const handleSubmit = () => {
    setRenderComponent(false)
  };

  return (
    <div className="flex min-h-screen min-w-full py-4 justify-center items-center bg-[#3d1a65] text-white flex-col">
      <div className="flex h-full lg:w-3xl justify-center items-center text-white flex-col gap-4">
        <span className="flex items-center justify-center flex-col gap-4">
          <h1 className="font-extrabold text-6xl text-center">Imposter Game</h1>
          <p className="font-bold text-3xl text-center">Free and Local Party Game</p>
        </span>
          {renderComponent ? (
            <PlayerList onSubmit={handleSubmit} />
        ) : (
          <Card />
        )}
      </div>
    </div>
  );
};

export default App;
