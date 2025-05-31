import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import WordsForm from "./WordsForm";

const ManageWords = () => {
  const [wordList, setWordList] = useState([]);
  const [wordTemporal, setWordTemporal] = useState({
    id: "",
    value: "",
    luck: "",
    creando: false,
    editando: false,
  });

  const getWordList = async () => {
    await fetch("http://localhost:3000/words")
      .then((response) => response.json())
      .then((data) => setWordList(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWordList();
  }, []);

  const handleDelete = async (id) => {
    fetch(`http://localhost:3000/words/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    await getWordList();
  };

  const handleEdit = (word) => {
    setWordTemporal({
      id: word.id,
      value: word.value,
      luck: word.luck,
      creando: false,
      editando: true,
    });
  };

  const handleCreate = () => {
    setWordTemporal({ ...wordTemporal, creando: true, editando: false });
  };

  return (
    <div>
      <button onClick={handleCreate}>Crear palabras</button>

      <ul>
        {wordList.map((word) => (
          <li key={word.id}>
            {word.value} - {word.luck} -{" "}
            <button onClick={() => handleEdit(word)}>
              <Icon.PencilFill color="#EBAE2D" />
            </button>
            <button
              onClick={() => {
                handleDelete(word.id);
              }}
            >
              <Icon.Trash3Fill color="#FF3333" />
            </button>
          </li>
        ))}
        {wordTemporal.creando || wordTemporal.editando ? (
          <div>
            <WordsForm
              tipoLlamada={"Crear"}
              wordTemporal={{}}
              setWordTemporal={setWordTemporal}
              getWordList={getWordList}
            />
          </div>
        ) : null}

        {/* {wordTemporal.editando ? (
          <div>
            <WordsForm
              tipoLlamada={"Editar"}
              wordTemporal={wordTemporal}
              setWordTemporal={setWordTemporal}
              getWordList={getWordList}
            />
          </div>
        ) : null} */}
      </ul>
    </div>
  );
};

export default ManageWords;
