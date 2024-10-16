import useStore from '@/store/store';
import {useState} from 'react';

export default function StoreTest() {

  const [input, setInput] = useState({input: 0});
  const { 
    bears, 
    increasePopulation,
    removeAllBears,
    updateBears
  } = useStore();

  const setInputValue = (e) => {
    const value = e.target.value;
    setInput(prev => ({
      ...prev, [e.target.name]: value
    }));
  };

  return (
    <>
      {/* <input name="input" value={input.input} onChange={setInputValue} type="number" /> */}
      <h1>{bears} around here...</h1>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>remove</button>
    </>
  )
} 