import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrap from '@components/layout/Wrap';
import RouterTest from '@components/pages/RouterTest';
import '@assets/styles/common.css';

function App() {

  return (
    <>
      <BrowserRouter>{/* Router test */}
        <Routes>
          <Route path="/" element={<Wrap />} />
          <Route path="/router" element={<RouterTest />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App