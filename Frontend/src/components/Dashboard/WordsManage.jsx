import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import WordsForm from "./WordsForm";
import Modal from "../../styles/Modal";

const ManageWords = () => {
  const [wordList, setWordList] = useState([]);
  const [wordTemporal, setWordTemporal] = useState({
    id: "",
    value: "",
    luck: "",
    creando: false,
    editando: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getWordsList = async () => {
    await fetch("http://localhost:3000/words")
      .then((response) => response.json())
      .then((data) => setWordList(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWordsList();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWordTemporal({
      id: "",
      value: "",
      luck: "",
      creando: false,
      editando: false,
    });
  };

  const createHandler = () => {
    setWordTemporal({
      id: "",
      value: "",
      luck: "",
      creando: true,
      editando: false,
    });
    openModal();
  };

  const editHandler = (word) => {
    setWordTemporal({
      id: word.id,
      value: word.value,
      luck: word.luck,
      creando: false,
      editando: true,
    });
    openModal();
  };

  const deleteHandler = async (id) => {
    await fetch(`http://localhost:3000/words/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    await getWordsList();
  };

  return (
    <div>
      <button onClick={createHandler}>Crear palabras</button>

      <ul>
        {wordList.map((word) => (
          <li key={word.id}>
            {word.value} - {word.luck} -{" "}
            <button onClick={() => editHandler(word)}>
              <Icon.PencilFill color="#EBAE2D" />
            </button>
            <button
              onClick={() => {
                deleteHandler(word.id);
              }}
            >
              <Icon.Trash3Fill color="#FF3333" />
            </button>
          </li>
        ))}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <WordsForm
            wordTemporal={wordTemporal}
            getWordsList={getWordsList}
            onSaveSuccess={closeModal}
            onCancel={closeModal}
          />
        </Modal>
      </ul>
    </div>
  );
};

export default ManageWords;
