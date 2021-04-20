import './selectField.scss';
import PropTypes from 'prop-types';
import React from 'react';
import FieldHolder from './FieldHolder';

const SelectField = (props) => {
  const { input, placeholder, showPlaceholder, options } = props;

  if (showPlaceholder && options[0].text !== placeholder) {
    options.unshift({ value: '', text: placeholder, disabled: true });
  }
  return (
    <FieldHolder {...props}>
      <select {...input} className="form-control select">
        {options.map(({ value, text }) => (
          <option key={`${value}-${text}`} value={value}>
            {text}
          </option>
        ))}
      </select>
    </FieldHolder>
  );
};

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  showPlaceholder: PropTypes.bool,
};

SelectField.defaultProps = {
  placeholder: '',
  showPlaceholder: true,
  options: [],
};

export default SelectField;
