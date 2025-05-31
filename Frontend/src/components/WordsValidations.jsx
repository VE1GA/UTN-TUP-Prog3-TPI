const WordsValidations = (datos) => {
  const errores = {};

  if (!datos.value.trim()) {
    console.log("La palabra es obligatoria");
    errores.value = "La palabra es obligatoria";
  } else if (!/^[a-zñ]{5}$/i.test(datos.value)) {
    console.log("la palabra debe contener 5 letras");
    errores.value =
      "La palabra debe contener EXACTAMENTE 5 letras, no incluir números ni caracteres especiales";
  }

  if (!datos.luck.trim()) {
    console.log("aclarar un valor es obligatorio");
    errores.luck = "Aclarar un valor es obligatorio";
  } else if (!/^(10|[1-9]|0)$/.test(datos.luck)) {
    console.log("el valor no es valido");
    errores.luck = "El valor no es valido, debe ser un número del 0 al 10";
  }

  return errores;
};

export default WordsValidations;
