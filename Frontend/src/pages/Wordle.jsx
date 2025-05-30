import { createContext, useState, useEffect } from "react";

import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import { boardDefault, generateWordSet } from "../components/Game/Words";

export const WordleContext = createContext();

const Wordle = () => {
  // Estados
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      console.log(words);
      setCorrectWord(words.todaysWord);
    });
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
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    // if (wordSet.has(currWord.toLowerCase())) {
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
    <div className="App">
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
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <nav>
          <h1>Wordle</h1>
        </nav>
        <div className="game">
          <Board />
          {/* {gameOver.gameOver ? <GameOver /> : <Keyboard />} */}
          <Keyboard />
        </div>
      </WordleContext.Provider>
    </div>
  );
};

export default Wordle;
