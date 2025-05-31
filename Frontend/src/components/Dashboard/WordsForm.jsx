import { useEffect, useState, useRef } from "react";

import * as Icon from "react-bootstrap-icons";

import WordValidations from "../WordValidations";

const WordsForm = ({ getWordList, wordTemporal, setWordTemporal }) => {
  const [formData, setFormData] = useState({
    value: "",
    luck: "",
  });
  const [errores, setErrores] = useState({});

  const valueRef = useRef(null);
  const luckRef = useRef(null);

  const tipoLlamada = wordTemporal.creando ? "Creando" : "Editando";

  useEffect(() => {
    if (tipoLlamada === "Editando") {
      setFormData({
        value: wordTemporal.value,
        luck: String(wordTemporal.luck),
      });
    }
  }, [wordTemporal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const errores = WordValidations(formData);

    if (Object.keys(errores).length > 0) {
      if (errores.value && valueRef.current) {
        valueRef.current.focus();
      } else if (errores.luck && luckRef.current) {
        luckRef.current.focus();
      }

      setErrores(errores);
    } else {
      setErrores({});

      if (tipoLlamada === "Crear") {
        await fetch("http://localhost:3000/words", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        await getWordList();
        setWordTemporal({
          id: "",
          value: "",
          creando: false,
        });
        alert(`La palabra ${formData.value} se añadió correctamente`);
      }

      if (tipoLlamada === "Editando") {
        await fetch(`http://localhost:3000/words/${wordTemporal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        await getWordList();
        setWordTemporal({
          id: "",
          value: "",
          editando: false,
        });
        alert(`La palabra ${formData.value} se modificó correctamente`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>Valor: </label>
        <input
          type="text"
          name="value"
          value={formData.value}
          onChange={handleChange}
          ref={valueRef}
        />
        {errores.value && <p style={{ color: "red" }}>{errores.value}</p>}
      </div>

      <div>
        <label>Probabilidad de ser elegida: </label>
        <input
          type="text"
          name="luck"
          value={formData.luck}
          onChange={handleChange}
          ref={luckRef}
        />
        {errores.luck && <p style={{ color: "red" }}>{errores.luck}</p>}
      </div>

      <button type="submit">
        <Icon.CheckCircleFill color="#0FC41A" size={20} />
      </button>
      <button
        onClick={() =>
          setWordTemporal({
            ...wordTemporal,
            editando: false,
            creando: false,
          })
        }
      >
        <Icon.XCircleFill color="#FF3333" size={20} />
      </button>
    </form>
  );
};

export default WordsForm;
