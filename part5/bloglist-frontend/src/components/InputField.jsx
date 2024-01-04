import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ label, type, value, name, onChange }) => {
  return (
    <div>
      {label}
      <input type={type} value={value} name={name} onChange={onChange} id={label} />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputField;