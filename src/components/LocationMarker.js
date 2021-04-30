import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { Col, Row } from 'reactstrap';
export const LocationMarker = ({ walk }) => {
  /*  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
 */
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
