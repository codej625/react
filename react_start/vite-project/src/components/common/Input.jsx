function Input({ className, type, value, checked, onChange, placeholder, readOnly }) {

  return (
    <input
      className={className}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  )

}

export default Input;