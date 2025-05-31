import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

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
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. Redirecting to login.");
      navigate("/iniciar_sesion");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
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
      setUserList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Podrías establecer un estado de error aquí para mostrar en la UI
    }
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
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. Redirecting to login.");
      navigate("/iniciar_sesion");
      return;
    }

    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
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
        await getUsersList(); // Recargar la lista después de borrar
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <div className="head">
        <h2>Lista de usuarios</h2>
        <button className="botonesCrear" onClick={createHandler}>
          Crear usuario
        </button>

        <ul className="user">
          {userList.map((user) => (
            <li key={user.id}>
              Name: "{user.name}" || Email: "{user.email}" || Role: "{user.role}
              "{" "}
              <div>
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
