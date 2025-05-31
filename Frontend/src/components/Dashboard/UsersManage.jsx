import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Icon from "react-bootstrap-icons";

import { getToken, checkToken } from "../../services/Token.services";

import UsersForm from "./UsersForm";

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

  const createHandler = () => {
    setUserTemporal({
      id: "",
      name: "",
      email: "",
      role: "",
      creando: true,
      editando: false,
    });
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
  };

  const deleteHandler = async (id) => {
    const token = getToken(navigate);

    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      checkToken(response, navigate);

      await getUsersList(); // Recargar la lista después de borrar
    }
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
                    deleteHandler(user.id);
                  }}
                >
                  <Icon.Trash3Fill color="#FF3333" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {userTemporal.creando || userTemporal.editando ? (
        <div>
          <UsersForm
            userTemporal={userTemporal}
            setUserTemporal={setUserTemporal}
            getUsersList={getUsersList}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UsersManage;
