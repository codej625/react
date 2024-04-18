import { useEffect, useState } from 'react';
import './App.css';
import data from './data.json';

function App() {
  /* 데이터 상태 선언 및 초기화 */
  const [users, setUsers] = useState(data);
  const [newUserData, setNewUserData] = useState({
    /* 새로운 사용자 데이터 상태 선언 */
    username: '',
    email: '',
  });

  /* 입력창 값 변경 시 이벤트 핸들러 */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* 새로운 사용자를 추가하는 함수 */
  const addUser = () => {
    /* 입력된 사용자 정보로 새로운 사용자 생성 */
    const newUser = {
      id: users.length + 1,
      username: newUserData.username,
      email: newUserData.email,
      active: false,
    };
    /* 기존 사용자 데이터와 새로운 사용자 데이터를 합침(concat) */
    const updatedUsers = users.concat(newUser);
    /* 상태 업데이트 */
    setUsers(updatedUsers);
    /* 입력 창 초기화 */
    setNewUserData({ username: '', email: '' });
  };

  /* 의존성 배열이 빈 배열인 경우, 컴포넌트가 마운트될 때 한 번만 실행됨 */
  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="container">
      <div>
        <h2>유저 목록</h2>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <div className="user-info">
                <div className="user-id">{user.id}.</div>
                <div className="user-username">{user.username}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="input-wrap">
          <div className="input-group">
            <input
              type="text"
              placeholder="이름"
              name="username"
              value={newUserData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="이메일"
              name="email"
              value={newUserData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='button-group'>
            <button 
              className="button" 
              onClick={addUser}
            >
              사용자 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;