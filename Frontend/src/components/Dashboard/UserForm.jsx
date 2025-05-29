import React, { useEffect, useState } from "react";
import UserInputs from "./UserInputs";

const UserForm = () => {
  const [userList, setUserList] = useState([]);
  const [esEditado, setEsEditado] = useState({
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
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
        {esEditado.esEditado ? (
          <div>
            <UserInputs
              usuarioFetch={userFetch}
              nameEdit={esEditado.name}
              emailEdit={esEditado.email}
              roleEdit={esEditado.role}
              setEsEditado={setEsEditado}
            />
            <button onClick={() => setEsEditado({ esEditado: false })}>
              Cancelar
            </button>
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default UserForm;
