import "./App.css";
// import Count from "./Count";
import React, { useState } from "react";

function App() {
  const [insert, setInsert] = useState(()=> {
    return {
      user: '',
      age: '',
    };
  });
  
  const [inputs, setInput] = useState(()=> {
    return {
      user: '',
      age: '',
    };
  });
  const {user, age} = inputs;

  function inputChange(e) {
    const {name, value} = e.target;

    setInput({
      ...inputs,
      [name]: value
    });
  }

  function inputInsert() {
    setInsert({
      ...insert,
      ...inputs,
    })
    setInput({
      ...inputs, 
        user: '',
        age: ''
    });
  }

  return (
    <div className="container">
      <div>
        <label htmlFor="name" className="label-style">이름 </label>
        <input 
          id="name" 
          name="user" 
          type="text" 
          onChange={inputChange} 
          value={user}
        />
      </div>
      <div>
        <label htmlFor="age" className="label-style">나이 </label>
        <input 
          id="age" 
          name="age" 
          type="text" 
          onChange={inputChange} 
          value={age}
        />
      </div>
      <div className="check-btn">
        <span className="contents">
          이름: {insert.user}
        </span>
        <span className="contents">
          나이: {insert.age}
        </span>
        <button 
          onClick={inputInsert} 
          type="button"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default App;