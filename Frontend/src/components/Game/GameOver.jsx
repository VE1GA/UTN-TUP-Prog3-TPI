import { useContext } from "react";
import { WordleContext } from "../../pages/Wordle";

const GameOver = () => {
  const { gameOver, currAttempt, correctWord, resetGame } =
    useContext(WordleContext);

  return (
    <div className="gameOver">
      <h1>{gameOver.guessedWord ? "Adivinaste la palabra" : "Perdiste"}</h1>
      <h2>La palabra era {correctWord}</h2>
      {gameOver.guessedWord && (
        <h3>Adivinaste en {currAttempt.attempt} intentos</h3>
      )}
      <button className="boton-reset" onClick={resetGame}>
        Volver a jugar
      </button>
    </div>
  );
};

export default GameOver;
