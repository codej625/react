import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> /* StrictMode -> 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구 */
    <App />
  // </React.StrictMode>, /* 렌더링이 두 번씩 되는 버그(?)가 있어서 주석 처리하였음 */
)