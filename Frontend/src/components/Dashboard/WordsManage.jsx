import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. Redirecting to login.");
      navigate("/iniciar_sesion");
      return;
    }

    console.log("[WordsManage] Enviando token para deleteHandler:", token);
    if (window.confirm("¿Estás seguro de que quieres eliminar esta palabra?")) {
      try {
        const response = await fetch(`http://localhost:3000/words/${id}`, {
          method: "DELETE",
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
        await getWordsList(); // Recargar la lista
      } catch (error) {
        console.error("Error deleting word:", error);
      }
    }
  };

  return (
    <div>
      <div className="head">
        <h2>Banco de palabras ({wordList.length})</h2>
        <button className="botonesCrear" onClick={createHandler}>
          Añadir una nueva palabra
        </button>
        <ul className="word">
          {wordList.map((word) => (
            <li key={word.id}>
              {word.value} (Probabilidad: {word.luck})
              <div>
                <button
                  className="edit-button"
                  onClick={() => editHandler(word)}
                >
                  <Icon.PencilFill color="#EBAE2D" />
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    deleteHandler(word.id);
                  }}
                >
                  <Icon.Trash3Fill color="#FF3333" />
                </button>
              </div>
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
    </div>
  );
};

export default ManageWords;
