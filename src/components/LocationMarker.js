import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
export const LocationMarker = ({ walk }) => {
  const position = [walk.latlng.latitude, walk.latlng.longitude];
  if (position === null) {
    return null;
  }
  return (
    <Marker position={position} color="primary">
      <Popup className="popup">
        <Row>
          <Col md="8" className="p-0">
            {walk.name}
            <br />
            <Link to={`/walk/${walk.id}`}>détails</Link>
          </Col>
          <Col md="4" className="p-2">
            {walk.pics[0]?.url && (
              <img
                className="markerpic"
                src={walk.pics[0]?.url}
                alt={`${walk.name} `}
              />
            )}
          </Col>
        </Row>
      </Popup>
    </Marker>
  );
};
