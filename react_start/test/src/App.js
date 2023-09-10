import React from 'react';
import Rendering from './components/Rendering';

function App() {
  return (
    <>
      <Rendering name="react" color="red" isSpecial={true} />
      <Rendering color="pink" />
    </>
  )
}

export default App;