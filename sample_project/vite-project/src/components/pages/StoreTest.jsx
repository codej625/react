import useStore from '@/store/store';
import {useState} from 'react';

export default function StoreTest() {

  const [ input, setInput ] = useState({input: 0});
  const { bears, increasePopulation, removeAllBears, updateBears } = useStore();

  const setInputValue = (e) => {
    const value = e.target.value;
    setInput(prev => ({
      ...prev, [e.target.name]: value
    }));
  };

  const removeInputValue = () => {
    setInput({input: 0});
    removeAllBears(input.input);
  };

  return (
    <>
      <h1>{bears} around here...</h1>
      <input 
        name="input" 
        value={input.input} 
        onChange={setInputValue} 
        type="number" 
        />
      <button 
        onClick={increasePopulation}
      >
        one up
      </button>
      <button 
        onClick={removeInputValue}
      >
        remove
      </button>
      <button 
        onClick={() => updateBears(input.input)}
      >
        update
      </button>
    </>
  )
} 