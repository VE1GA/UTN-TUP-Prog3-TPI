import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import WordsForm from "./WordsForm";
import Modal from "../../styles/Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Importar el nuevo modal

import { toast, Slide } from "react-toastify"; // Para notificaciones
import "react-toastify/dist/ReactToastify.css";

const ManageWords = () => {
  const [wordList, setWordList] = useState([]);
  const [wordTemporal, setWordTemporal] = useState({
    id: "",
    value: "",
    luck: "",
    creando: false,
    editando: false,
  });

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [wordToDelete, setWordToDelete] = useState(null);

  const navigate = useNavigate();

  const toastConfig = {
    position: "bottom-center",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
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

  useEffect(() => {
    getWordsList();
  }, []);

  const openModal = () => {
    setIsFormModalOpen(true);
  };

  const closeModal = () => {
    setIsFormModalOpen(false);
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

  const handleDeleteRequest = (word) => {
    setWordToDelete(word);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDeleteHandler = async () => {
    if (!wordToDelete) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. Redirecting to login.");
      toast.error(
        "Sesión expirada, por favor inicia sesión nuevamente.",
        toastConfig
      );
      navigate("/iniciar_sesion");
      return;
    }

    console.log(
      "[WordsManage] Enviando token para confirmDeleteHandler:",
      token
    );
    try {
      const response = await fetch(
        `http://localhost:3000/words/${wordToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error("Token invalid or expired. Redirecting to login.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          toast.error(
            "Sesión inválida o expirada. Redirigiendo al login.",
            toastConfig
          );
          navigate("/iniciar_sesion");
          // No lanzar error aquí para evitar doble toast, la redirección es suficiente
          return;
        }
        const errorData = await response.json().catch(() => ({})); // Intenta parsear JSON, si falla, objeto vacío
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }
      toast.error(
        `Palabra "${wordToDelete.value}" eliminada correctamente.`,
        toastConfig
      );
      await getWordsList(); // Recargar la lista
    } catch (error) {
      console.error("Error deleting word:", error);
      toast.error(
        error.message || "Error al eliminar la palabra.",
        toastConfig
      );
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setWordToDelete(null);
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
                    handleDeleteRequest(word);
                  }}
                >
                  <Icon.Trash3Fill color="#FF3333" />
                </button>
              </div>
            </li>
          ))}

          <Modal isOpen={isFormModalOpen} onClose={closeModal}>
            <WordsForm
              wordTemporal={wordTemporal}
              getWordsList={getWordsList}
              onSaveSuccess={closeModal}
              onCancel={closeModal}
            />
          </Modal>

          <ConfirmDeleteModal
            isOpen={isConfirmDeleteModalOpen}
            onClose={() => setIsConfirmDeleteModalOpen(false)}
            onConfirm={confirmDeleteHandler}
            title="Confirmar eliminación de palabra"
            message={`¿Estás seguro de que quieres eliminar la palabra "${wordToDelete?.value}"? Esta acción no se puede deshacer.`}
          />
        </ul>
      </div>
    </div>
  );
};

export default ManageWords;
