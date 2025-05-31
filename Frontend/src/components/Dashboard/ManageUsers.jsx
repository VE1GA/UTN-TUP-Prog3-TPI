import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import UserForm from "./UserForm";

const ManageUsers = () => {
  const [userList, setUserList] = useState([]);
  const [userTemporal, setUserTemporal] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    creando: false,
    editando: false,
  });

  const getUserList = async () => {
    await fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleDelete = async (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    await getUserList();
  };

  const handleEdit = (user) => {
    setUserTemporal({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      creando: false,
      editando: true,
    });
  };

  const handleCreate = () => {
    setUserTemporal({ ...userTemporal, creando: true, editando: false });
  };

  return (
    <div>
      <button onClick={handleCreate}>Crear usuario</button>

      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role} -{" "}
            <button onClick={() => handleEdit(user)}>
              <Icon.PencilFill color="#EBAE2D" />
            </button>
            <button
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              <Icon.Trash3Fill color="#FF3333" />
            </button>
          </li>
        ))}
        {userTemporal.creando ? (
          <div>
            <UserForm
              tipoLlamada={"Crear"}
              userTemporal={{}}
              setUserTemporal={setUserTemporal}
              getUserList={getUserList}
            />
          </div>
        ) : null}

        {userTemporal.editando ? (
          <div>
            <UserForm
              tipoLlamada={"Editar"}
              userTemporal={userTemporal}
              setUserTemporal={setUserTemporal}
              getUserList={getUserList}
            />
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default ManageUsers;
