import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import UserInputs from "./UserInputs";

const UserForm = () => {
  const [userList, setUserList] = useState([]);
  const [esEditado, setEsEditado] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    esEditado: false,
  });

  const userFetch = async () => {
    await fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    userFetch();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    userFetch();
  };

  const handleEdit = (user) => {
    setEsEditado({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      esEditado: true,
    });
  };

  return (
    <div>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role} -
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
        {esEditado.esEditado ? (
          <div>
            <UserInputs
              usuarioFetch={userFetch}
              esEditado={esEditado}
              setEsEditado={setEsEditado}
            />
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default UserForm;
