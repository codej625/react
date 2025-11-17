import { useRef, useState, useEffect } from "react";

export default function Ref() {
  const ref = useRef(0);
  const [state, setState] = useState(ref.current);

  const refUp = () => {
    ref.current += 1;
    setState(ref.current);
  };

  useEffect(() => {
    console.log(state);
  }, [state]);


  return (
    <>
      <p>{state}</p>

      <button 
        onClick={() => refUp()}
      >
        클릭
      </button>
    </>
  );
}