import "react-toastify/dist/ReactToastify.css";
import "../styles/App.css";

import { createContext, useState, useEffect } from "react";

import Modal from "../components/Modal";
import { toast, Slide } from "react-toastify";

import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import GameOver from "../components/Game/GameOver";
import { boardDefault, generateGameWords } from "../components/Game/Words";
import { useNavigate } from "react-router-dom";

export const WordleContext = createContext();

const Wordle = () => {
  // Estados
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordBank, setWordBank] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const navigate = useNavigate();

  const toastConfig = {
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
  };

  const resetGame = async () => {
    const newBoard = boardDefault.map((row) => row.map(() => ""));

    setBoard(newBoard);
    setCurrAttempt({ attempt: 0, letterPos: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });

    const words = await generateGameWords();
    setWordBank(words.wordBank);
    setCorrectWord(words.correctWord);

    console.log(words);
  };

  useEffect(() => {
    generateGameWords().then((words) => {
      setWordBank(words.wordBank);
      setCorrectWord(words.correctWord);

      console.log(words);
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
    if (wordBank.has(currWord.toUpperCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 }); // Pasa al siguiente renglón
    } else {
      toast.error("Palabra no válida", toastConfig);
    }
    if (currWord.toUpperCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
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
          setGameOver,
          resetGame,
        }}
      >
        <nav>
          <h1>Wordle</h1>
        </nav>

        <div className="botones">
          <button onClick={() => navigate("/ranking")}>Ranking</button>
          <button onClick={() => navigate("/perfil")}>Perfil</button>
          <button onClick={() => navigate("/equipos")}>Equipos</button>
        </div>

        <div className="game">
          <Board />

          {gameOver.gameOver ? (
            <Modal isOpen={gameOver.gameOver} onClose={resetGame}>
              <GameOver />
            </Modal>
          ) : (
            <Keyboard />
          )}
        </div>
      </WordleContext.Provider>
    </div>
  );
};

export default Wordle;
