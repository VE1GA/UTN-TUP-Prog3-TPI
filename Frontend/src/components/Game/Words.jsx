import { getToken, checkToken } from "../../services/Token.services";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const luckyWordBank = (words) => {
  const pesoTotal = words.reduce((sum, word) => {
    if (word.luck <= 0) return sum; // Las palabras con luck === 0 se ignoran
    return sum + (word.luck === 1 ? 1 : word.luck * 5); // Sumar pesos
  }, 0);

  let random = Math.random() * pesoTotal; // Número aleatorio entre 0 y la suma total

  for (const word of words) {
    if (word.luck <= 0) continue; // Saltear si no tiene luck

    const peso = word.luck === 1 ? 1 : word.luck * 5;

    if (random < peso) return word.value; // Si random está en el rango, se elige esa palabra y sale del for

    random -= peso; // Si no, se descuenta el peso y se sigue buscando
  }
};

export const generateGameWords = async (navigate) => {
  const token = getToken(navigate); // Ahora 'navigate' está definido
  if (!token) return; // Si getToken falla, salir

  const response = await fetch("http://localhost:3000/words", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  checkToken(response, navigate);

  const data = await response.json();

  const wordBank = new Set(data.map((word) => word.value));
  const correctWord = luckyWordBank(data);

  return { wordBank, correctWord };
};
