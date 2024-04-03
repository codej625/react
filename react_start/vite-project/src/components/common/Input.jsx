function Input({ className, type, value, checked, onChange, placeholder }) {

  return (
    <input
      className={className}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
    />
  )

}

export default Input;