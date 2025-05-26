import { useContext } from "react";

import { WordleContext } from "../../pages/Wordle";

const Letter = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currAttempt } = useContext(WordleContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost.toUpperCase() ? "almost" : "error");
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
