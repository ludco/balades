import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormLabel } from 'react-bootstrap';
import Help from './Help';

const FieldHolder = (props) => {
  const {
    input: { name },
    tooltip,
    meta: { error, warning, touched, data },
    showErrorBeforeTouched,
    showWarningBeforeTouched,
    children,
  } = props;

  let validationstate;
  if (
    (data && data.error ? data.error : error) &&
    (touched || showErrorBeforeTouched)
  ) {
    validationstate = 'error';
  } else if (
    (data && data.warning ? data.warning : warning) &&
    (touched || showWarningBeforeTouched)
  ) {
    validationstate = 'warning';
  }

  return (
    <FormGroup controlId={name} validationstate={validationstate}>
      {tooltip && <Help input={name} text={tooltip} />}
      {children}
      {validationstate && (
        <FormLabel
          className={`section-textarea__message ${validationstate}`}
        ></FormLabel>
      )}
    </FormGroup>
  );
};

FieldHolder.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  customLabel: PropTypes.object,
  meta: PropTypes.object.isRequired,
  tooltip: PropTypes.object,
  warn: PropTypes.func,
  showErrorBeforeTouched: PropTypes.bool,
  showWarningBeforeTouched: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

FieldHolder.defaultProps = {
  label: '',
  warn: undefined,
  customLabel: undefined,
  tooltip: undefined,
  showErrorBeforeTouched: false,
  showWarningBeforeTouched: false,
};

export default FieldHolder;
