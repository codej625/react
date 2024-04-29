// 1. 사용할 컴포넌트를 임포트 한다.
import Count from './Count';

function App() {
  return (
    /*
      2. 컴포넌트를 적어 준다. Fragment(프래그먼트 <></>)를 사용하여 여러 개의 자식 요소를 그룹화 한다.
         두 개 이상의 태그는 무조건 하나의 태그로 감싸줘야 한다.
    */
    <>
      <Count />
      {/* 
        컴포넌트를 재사용 하는것도 가능하다.
        <Count />
        <Count /> 
      */}
    </>
  );
}

export default App;
