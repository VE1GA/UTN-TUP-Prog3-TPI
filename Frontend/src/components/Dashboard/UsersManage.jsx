import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

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

  const getUsersList = async () => {
    await fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.log(error));
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
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    await getUsersList();
  };

  return (
    <div>
      <button onClick={createHandler}>Crear usuario</button>

      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role} -{" "}
            <button onClick={() => editHandler(user)}>
              <Icon.PencilFill color="#EBAE2D" />
            </button>
            <button
              onClick={() => {
                deleteHandler(user.id);
              }}
            >
              <Icon.Trash3Fill color="#FF3333" />
            </button>
          </li>
        ))}
      </ul>

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
