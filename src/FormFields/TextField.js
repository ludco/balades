import PropTypes from 'prop-types';
import React from 'react';
import { FormControl } from 'react-bootstrap';
import FieldHolder from './FieldHolder';

const TextField = (props) => {
  const {
    placeholder,
    input,
    readOnly,
    type,
    bsclass,
    disabled,
    rows,
    as,
  } = props;
  return (
    <FieldHolder {...props}>
      <FormControl
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        bsclass={bsclass}
        disabled={disabled}
        rows={rows}
        as={as}
        {...input}
      />
    </FieldHolder>
  );
};

TextField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  type: 'text',
  placeholder: undefined,
  readOnly: false,
  disabled: false,
};

export default TextField;
