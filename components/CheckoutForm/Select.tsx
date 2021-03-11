const Select = ({name, label, register, options}) => {
  return (
  <label style={{display:'block'}}>
    {label}
    <select 
      name={name} 
      ref={register}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
  )
}

export default Select