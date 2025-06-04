import { useContext, useEffect } from "react";

import { WordleContext } from "../../pages/Wordle";

const Letter = ({ letterPos, attemptVal }) => {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters,
    disabledLetters,
  } = useContext(WordleContext);

  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");
  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
