import { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

import WordsValidations from "../WordsValidations";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WordsForm = ({ wordTemporal, getWordsList, onSaveSuccess, onCancel }) => {
  // Declaraciones
  const [formData, setFormData] = useState({
    value: "",
    luck: "",
  });
  const [errores, setErrores] = useState({});

  const valueRef = useRef(null);
  const luckRef = useRef(null);
  const navigate = useNavigate();

  const tipoLlamada = wordTemporal.creando ? "Creando" : "Editando";

  let endpoint;
  let metodo;
  let mensaje;

  // Rellenado de los campos con los datos de la palabra (o vacío si se está creando)
  useEffect(() => {
    setFormData({
      value: wordTemporal.value,
      luck: String(wordTemporal.luck),
    });
  }, [wordTemporal]);

  // Guardar los cambios que hace el usuario en el formulario
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar lo que sucede al pulsar el botón "✅"
  const submitHandler = async (e) => {
    e.preventDefault();

    const errores = WordsValidations(formData);
    if (Object.keys(errores).length > 0) {
      if (errores.value && valueRef.current) {
        valueRef.current.focus();
        toast.error(errores.value, {
          toastId: "valueError",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      } else if (errores.luck && luckRef.current) {
        luckRef.current.focus();
        toast.error(errores.luck, {
          toastId: "luckError",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }

      setErrores(errores);
    } else {
      setErrores({});

      if (tipoLlamada === "Creando") {
        endpoint = "http://localhost:3000/words";
        metodo = "POST";
        mensaje = "se añadió correctamente";
      } else if (tipoLlamada === "Editando") {
        endpoint = `http://localhost:3000/words/${wordTemporal.id}`;
        metodo = "PUT";
        mensaje = "se modificó correctamente";
      }
      
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/iniciar_sesion");
        return;
      }
      console.log(`[WordsForm - ${tipoLlamada}] Enviando token:`, token);

      try {
        const response = await fetch(endpoint, {
          method: metodo,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.error("Token invalid or expired. Redirecting to login.");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            navigate("/iniciar_sesion");
            return;
          }
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        await getWordsList();
        setWordTemporal({
          id: "",
          value: "",
          luck: "",
          creando: false,
          editando: false,
        });
        alert(`La palabra ${formData.value} ${mensaje}`);
        onSaveSuccess();
      } catch (error) {
        console.error(`Error ${tipoLlamada.toLowerCase()} word:`, error);
        alert(
          `Error al ${tipoLlamada.toLowerCase()} palabra: ${error.message}`
        );
      }
    }
  };

  return (
    <form onSubmit={submitHandler} noValidate>
      <div>
        <label>Valor: </label>
        <input
          type="text"
          name="value"
          value={formData.value}
          onChange={changeHandler}
          ref={valueRef}
        />
      </div>

      <div>
        <label>Probabilidad de ser elegida: </label>
        <input
          type="text"
          name="luck"
          value={formData.luck}
          onChange={changeHandler}
          ref={luckRef}
        />
      </div>

      <button type="submit">
        <Icon.CheckCircleFill color="#0FC41A" size={20} />
      </button>
      <button type="button" onClick={onCancel}>
        {" "}
        {}
        <Icon.XCircleFill color="#FF3333" size={20} />
      </button>
    </form>
  );
};

export default WordsForm;
