function Input({ type, value, checked, onChange, placeholder }) {

  return (
    <input
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
    />
  )

}

export default Input;