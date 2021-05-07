/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

export const Bounds = ({ getAndSetZoom, getAndSetBounds }) => {
  const [currentZoom, setCurrentZoom] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const mapEvents = useMapEvents({
    zoomend: () => {
      setCurrentZoom(mapEvents.getZoom());
    },
    moveend: () => {
      setCurrentPosition(mapEvents.getCenter());
    },
  });
  useEffect(() => {
    getAndSetBounds(mapEvents.getBounds());
  }, [currentZoom, currentPosition]);

  return <div></div>;
};
