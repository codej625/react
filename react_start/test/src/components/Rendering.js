import React from 'react';

const Test = ({ color, name, isSpecial }) => {
  return (
    <div style={{ color }}>
      {/* {isSpecial && <span>isSpecial o, </span>} */}
      {/* 위와 동일한 로직을 삼항연산자로 표현 */}
      {isSpecial !== undefined ? <span>isSpecial o, </span> : ''} 
      <span>name is {name}</span>
    </div>
  );
}

Test.defaultProps = {
  name: 'no name'
}

export default Test;