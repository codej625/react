import { useState } from 'react';
import { CustomContext } from '@context/CustomContext';
import ChildComponent from '@components/pages/ChildComponent';

const ContextApi = () => {
  const [state, setState] = useState('codej625');

  return (
    // Context Provider를 사용하여 하위 컴포넌트에 데이터를 제공. (보통 최상위 컴포넌트에서 설정한다.
    <CustomContext.Provider value={{ state, setState }}>
      <ChildComponent /> 
    </CustomContext.Provider>
  );
};

export default ContextApi;