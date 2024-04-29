import React, { forwardRef, useEffect } from 'react';

const Input = forwardRef(({ className, type, value, checked, onChange, placeholder, readOnly }, ref) => {

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
      console.log('Ref ', ref.current.value);
    }
  });

  return (
    <input
      ref={ref}
      className={className}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
});

export default Input;