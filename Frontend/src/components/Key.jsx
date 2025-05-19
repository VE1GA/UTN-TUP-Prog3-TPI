import React, { useContext } from "react";

import { WordleContext } from "../pages/Wordle";

const Key = ({ keyVal, bigKey }) => {
  const { onSelectLetter, onEnter, onDelete } = useContext(WordleContext);

  const selectLetter = () => {
    // Definición del comportamiento de la tecla Enter
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div className="key" id={bigKey && "big"} onClick={selectLetter}>
      {keyVal}
    </div>
  );
};

export default Key;
