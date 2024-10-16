# Zustand(State management library)

<br /><br />

```
Zustand 는 상태 관리 라이브러리 중 하나로,
작은 패키지 크기와 직관적인 사용법 덕분에
Redux 와 Mobx 와 더불어 많은 개발자들로부터 선택받은
클라이언트 상태 관리 라이브러리이다.
```

<br /><br /><br />

1. Installation

```npm
# NPM
npm install zustand
```

<br /><br />

2. Create store

```javascript
import { create } from 'zustand'

// 예시
const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: Number(newBears) }),
}))

export default useStore
```

<br /><br />

3. Use

```jsx
// 예시
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
```
