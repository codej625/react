import { useContext } from 'react';
import { CustomContext } from '@context/CustomContext';
import { UseContext } from '@context/UserContext';

export default function ChildComponent() {
  const { state, setState } = useContext(CustomContext); // 만들어 놓은 context 사용.
  const text = useContext(UseContext); // 만들어 놓은 context 사용.
  const change = () => {
    setState(prev => prev === 'codej625' ? 'codeflow625' : 'codej625');
  };

  return (
    <div>
      <p>{text}</p>
      <p>{state}</p>
      <button
        onClick={change}
      >
        Change
      </button>
    </div>
  );
}