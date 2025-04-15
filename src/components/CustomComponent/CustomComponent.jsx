import React, { useState } from "react";

const CustomComponent = () => {
  const [colors, setColors] = useState("black");
  const [colorName, setColorName] = useState("Negro 🐈‍⬛");

  const [counter, setCounter] = useState(0);

  const [isClicked, setIsClicked] = useState(false);
  const [isClickedButton, setIsClickedButton] = useState(false);

  function redHandler() {
    setColors("red");
    setColorName("Rojo 🩸");
  }

  function greenHandler() {
    setColors("green");
    setColorName("Verde 🦠");
  }

  function blueHandler() {
    setColors("blue");
    setColorName("Azul 🩲");
  }

  function defaultHandler() {
    setColors("");
    setColorName("Negro 🐈‍⬛");
  }

  function sumaHandler() {
    setCounter(counter + 1);
  }

  function restaHandler() {
    if (counter > 0) {
      setCounter(counter - 1);
    }
    // CON OP TERNARIO -> counter > 0 ? setCounter(counter - 1) : counter
  }

  function defaultCounterHandler() {
    setCounter(0);
  }

  function onClickHandler() {
    isClicked ? setIsClicked(false) : setIsClicked(true);
    isClickedButton ? setIsClickedButton(false) : setIsClickedButton(true);
  }

  return (
    <div>
      <p style={{ color: colors }}>Soy de color: {colorName}</p>
      <button onClick={redHandler}>Cambiar a rojo</button>
      <button onClick={greenHandler}>Cambiar a verde</button>
      <button onClick={blueHandler}>Cambiar a azul</button>
      <button onClick={defaultHandler}>Volver al estado original</button>

      <p>Contador : {counter}</p>
      <button onClick={sumaHandler}>+</button>
      <button onClick={restaHandler}>-</button>
      <button onClick={defaultCounterHandler}>Reiniciar</button>

      <p>Acá debajo hay un mensaje secreto</p>

      {isClicked ? <p>Bu! 🙉👻</p> : null}
      {isClickedButton ? (
        <button onClick={onClickHandler}>Ocultar Mensaje Secreto</button>
      ) : (
        <button onClick={onClickHandler}>Mostrar Mensaje Secreto</button>
      )}
    </div>
  );
};

export default CustomComponent;
