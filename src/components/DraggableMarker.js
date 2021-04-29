/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

export const DraggableMarker = ({ center, fromDraggable }) => {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  useEffect(() => {
    fromDraggable(position);
  }, [position]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>Point de départ de la balade</span>
      </Popup>
    </Marker>
  );
};
