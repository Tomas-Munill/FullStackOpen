import React from "react"

const InputField = ({ label, type, value, name, onChange }) => {
  return (
    <div>
    {label} <input 
      type={type}
      value={value}
      name={name}
      onChange={onChange} />
  </div>
  )
}

export default InputField