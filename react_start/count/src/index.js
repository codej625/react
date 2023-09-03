import React from 'react';
// 브라우저에 있는 실제 DOM 내부에 리액트 컴포넌트를 렌더링하겠다는 것을 의미 한다.
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* 
  public/index.html 내부에 'root'라는 id를 가진 div를 찾을 수 있다.
  결국, 리액트 컴포넌트가 렌더링 될 때에는, 렌더링된 결과물이 위 div 내부에 렌더링되는 것 입니다.
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
