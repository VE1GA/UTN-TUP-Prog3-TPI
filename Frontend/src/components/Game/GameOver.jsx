import { useContext } from "react";
import { WordleContext } from "../../pages/Wordle";

const GameOver = () => {
  const { gameOver, currAttempt, correctWord } = useContext(WordleContext);
  return (
    <div className="gameOver">
      <h3> {gameOver.guessedWord ? "Adivinaste la palabra" : "Perdiste"} </h3>
      <h1> Palabra correcta: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3> Adivinaste en: {currAttempt.attempt} intentos </h3>
      )}
    </div>
  );
};

export default GameOver;
