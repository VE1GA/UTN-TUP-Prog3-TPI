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

const getWordsList = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found. Redirecting to login.");
    navigate("/iniciar_sesion");
    return;
  }

  console.log("[WordsManage] Enviando token para getWordsList:", token);
  try {
    const response = await fetch("http://localhost:3000/words", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.error("Token invalid or expired. Redirecting to login.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/iniciar_sesion");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setWordList(data);
  } catch (error) {
    console.error("Error fetching words:", error);
    // Podrías establecer un estado de error aquí para mostrar en la UI
  }
};
export const generateGameWords = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found. Redirecting to login.");
    navigate("/iniciar_sesion");
    return;
  }

  const response = await fetch("http://localhost:3000/words", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  const wordBank = new Set(data.map((word) => word.value));
  const correctWord = luckyWordBank(data);

  return { wordBank, correctWord };
};
