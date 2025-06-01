import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Icon from "react-bootstrap-icons";

import { getToken, checkToken } from "../../services/Token.services";

import UsersForm from "./UsersForm";
import Modal from "../../styles/Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Importar el nuevo modal

import { toast, Slide } from "react-toastify"; // Para notificaciones
import "react-toastify/dist/ReactToastify.css";

const UsersManage = () => {
  const [userList, setUserList] = useState([]);
  const [userTemporal, setUserTemporal] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    creando: false,
    editando: false,
  });
  const navigate = useNavigate();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const toastConfig = {
    position: "bottom-center",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
  };

  const getUsersList = async () => {
    const token = getToken(navigate);

    const response = await fetch("http://localhost:3000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    checkToken(response, navigate);
    const data = await response.json();
    setUserList(data);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const closeModal = () => {
    setIsFormModalOpen(false);
    setUserTemporal({
      id: "",
      name: "",
      email: "",
      role: "",
      creando: false,
      editando: false,
    });
  };

  const openModal = () => {
    setIsFormModalOpen(true);
  };

  const createHandler = () => {
    setUserTemporal({
      id: "",
      name: "",
      email: "",
      role: "",
      creando: true,
      editando: false,
    });
    openModal();
  };

  const editHandler = (user) => {
    setUserTemporal({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      creando: false,
      editando: true,
    });
    openModal();
  };

  const handleDeleteRequest = (user) => {
    setUserToDelete(user);
    setIsConfirmDeleteModalOpen(true);
  };

  const confirmDeleteHandler = async () => {
    if (!userToDelete) return;

    const token = getToken(navigate);
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      checkToken(response, navigate);

      toast.success(
        `Usuario "${userToDelete.name}" eliminado correctamente.`,
        toastConfig
      );
      await getUsersList(); // Recargar la lista después de borrar
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(
        error.message || "Error al eliminar el usuario.",
        toastConfig
      );
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div>
      <div className="head">
        <h2>Lista de usuarios ({userList.length})</h2>
        <button className="botonesCrear" onClick={createHandler}>
          Crear un nuevo usuario
        </button>

        <ul className="user">
          {userList.map((user) => (
            <li key={user.id}>
              <div className="info-elemento">
                {user.email} ({user.name})
              </div>

              <div className="iconos-elemento">
                {user.role === "ADMIN" ? (
                  <Icon.PersonFillGear className="admin-icon" color="#172EFF" />
                ) : null}
                <button
                  className="edit-button"
                  onClick={() => editHandler(user)}
                >
                  <Icon.PencilFill color="#EBAE2D" />
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    handleDeleteRequest(user);
                  }}
                >
                  <Icon.Trash3Fill color="#FF3333" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isFormModalOpen} onClose={closeModal}>
        <UsersForm
          userTemporal={userTemporal}
          getUsersList={getUsersList}
          onSaveSuccess={closeModal}
          onCancel={closeModal}
        />
      </Modal>

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        onConfirm={confirmDeleteHandler}
        title="Confirmar Eliminación de Usuario"
        message={`¿Estás seguro de que quieres eliminar al usuario "${userToDelete?.name}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
};

export default UsersManage;
