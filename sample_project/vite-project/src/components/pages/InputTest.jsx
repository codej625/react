import { useState, useEffect } from "react";

export default function InputTest() {

  const [input, setInput] = useState({
    id: '',
    password: '',
    email: ''
  });

  const onChangeInput = (e) => {
    setInput((prev) => {
      return {
        ...prev, 
        [e.target.name]: e.target.value
      }
    });
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <>
      {Object.keys(input).map(ele => (
        <input 
          key={ele}
          type="text" 
          name={ele}
          value={input[ele]}
          onChange={(e) => onChangeInput(e)}
        />
      ))}
    </>
  );
}
