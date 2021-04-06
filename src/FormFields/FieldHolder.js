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

  let validationState;
  if (
    (data && data.error ? data.error : error) &&
    (touched || showErrorBeforeTouched)
  ) {
    validationState = 'error';
  } else if (
    (data && data.warning ? data.warning : warning) &&
    (touched || showWarningBeforeTouched)
  ) {
    validationState = 'warning';
  }

  return (
    <FormGroup controlId={name} validationState={validationState}>
      {tooltip && <Help input={name} text={tooltip} />}
      {children}
      {validationState && (
        <FormLabel
          className={`section-textarea__message ${validationState}`}
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
