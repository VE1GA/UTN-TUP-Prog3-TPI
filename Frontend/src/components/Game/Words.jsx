export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  await fetch("http://localhost:3000/words")
    .then((response) => response.json())
    .then((data) => {
      const wordArray = data.map((wordObj) => wordObj.value);
      todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)];
      wordSet = new Set(wordArray);
    });
  return { wordSet, todaysWord };
};
