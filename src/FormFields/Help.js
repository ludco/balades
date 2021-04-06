import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const Help = ({ input, text }) => {
  const popover = <Popover id={`${input}-popover`}>{text}</Popover>;
  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="left"
      overlay={popover}
    >
      {/*  <Glyphicon className="pull-right" glyph="info-sign" /> */}
    </OverlayTrigger>
  );
};

Help.propTypes = {
  input: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
};
export default Help;
