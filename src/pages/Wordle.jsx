import React from "react";
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import "../App.css";
import { createContext, useState } from "react";
import { boardDefault } from "../components/Words";

export const WordleContext = createContext();

const Wordle = () => {
  const [board, setBoard] = useState(boardDefault);
  return (
    <div>
      <WordleContext.Provider value={{ board, setBoard }}>
        <Board />
        <Keyboard />
      </WordleContext.Provider>
    </div>
  );
};

export default Wordle;
