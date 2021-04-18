import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'react-bootstrap';

import Help from './Help';

const CheckboxField = ({ input, label, meta, tooltip }) => {
  const { touched, warning, error } = meta;

  let state = null;
  if (touched) state = error ? 'error' : warning ? 'warning' : null;

  return (
    <FormGroup controlId={input.name} validationstate={state}>
      {tooltip && <Help input={input.name} text={tooltip} />}

      <label className="control control--checkbox">
        {label}
        <input type="checkbox" checked={input.value} {...input} />
        <div className="control__indicator" />
      </label>
    </FormGroup>
  );
};

CheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
  tooltip: PropTypes.object,
};

CheckboxField.defaultProps = {
  label: '',
  meta: undefined,
  tooltip: undefined,
};

export default CheckboxField;
