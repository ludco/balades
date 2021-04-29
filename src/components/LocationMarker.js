import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

export const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  if (position === null) {
    return null;
  }
  return (
    <Marker position={position} color="primary">
      <Popup>You are here</Popup>
    </Marker>
  );
};
