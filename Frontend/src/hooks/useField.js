import { useRef, useState } from "react";

export const useField = (type, name, placeholder) => {
  const [value, setValue] = useState("");
  const ref = useRef();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, ref, name, placeholder, onChange };
};
