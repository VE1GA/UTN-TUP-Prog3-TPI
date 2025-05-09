import React, { useEffect } from "react";
import { createContext, useState } from "react";

import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import { boardDefault, wordArray } from "../components/Words";

export const WordleContext = createContext();

const Wordle = () => {
  // Estados
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  const correctWord = "RIGHT";

  useEffect(() => {
    console.log(wordArray);
  }, []);

  // Funciones
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return; // Si todavía no se completó el renglón, no es posible apretar "Enter"
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 }); // Pasa al siguiente renglón
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  // Renderizado
  return (
    <div>
      <WordleContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
          correctWord,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </WordleContext.Provider>
    </div>
  );
};

export default Wordle;
