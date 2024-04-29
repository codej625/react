import React, { forwardRef, useEffect } from 'react';

const Input = forwardRef(({ className, type, value, checked, onChange, placeholder, readOnly, todos }, ref) => {

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [todos]);

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