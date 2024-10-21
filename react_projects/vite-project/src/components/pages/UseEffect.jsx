import { useState, useEffect } from 'react';
import RouterTest from '@components/pages/RouterTest';

export default function UseEffect() {

  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [component, setComponent] = useState(false);

  const onclick = (bool) => bool ? setNumber(prev => prev + 1) : setNumber(prev => prev - 1);
  const onclick2 = (bool) => bool ? setNumber2(prev => prev + 1) : setNumber2(prev => prev - 1);
  const componentRendering = () => {
    setComponent(prev => !prev);
  };

  useEffect(() => {
    console.log('test');
  }, [component, number])

  return (
    <>
      <p>{number}</p>
      <button
        onClick={() => onclick(true)}
      >
        up
      </button>
      <button
        onClick={() => onclick(false)}
      >
        down
      </button>
      <button
        onClick={componentRendering}
      >
        component on
      </button>

      <br />
      <p>{number2}</p>
      <button
        onClick={() => onclick2(true)}
      >
        up
      </button>
      <button
        onClick={() => onclick2(false)}
      >
        down
      </button>
      {component&&<RouterTest />}
      
    </>
  )
} 