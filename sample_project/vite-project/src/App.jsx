import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrap from '@components/layout/Wrap';
import RouterTest from '@components/pages/RouterTest';
import Ref from '@components/pages/Ref';
import InputTest from '@components/pages/InputTest';
import StoreTest from '@components/pages/StoreTest';
import ReactQuery from '@components/pages/ReactQuery';
import UseEffect from '@components/pages/UseEffect';
import Test from '@components/pages/Test';
import ContextApi from '@components/pages/ContextApi';
import '@assets/styles/common.css';

function App() {

  return (
    <>
      <BrowserRouter>{/* Router test */}
        <Routes>
          <Route path="/" element={<Wrap />} />
          <Route path="/router" element={<RouterTest />} />
          <Route path="/ref" element={<Ref />} />
          <Route path="/input" element={<InputTest />} />
          <Route path="/store" element={<StoreTest />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route path="/useeffect" element={<UseEffect />} />
          <Route path="/test" element={<Test />} />
          <Route path="/context-api" element={<ContextApi />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App