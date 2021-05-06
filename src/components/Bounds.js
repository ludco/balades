/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

export const Bounds = ({ zoom, getAndSetZoom, getAndSetBounds }) => {
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const mapEvents = useMapEvents({
    zoomend: () => {
      setCurrentZoom(mapEvents.getZoom());
    },
  });
  useEffect(() => {
    getAndSetBounds(mapEvents.getBounds());
  }, [currentZoom]);

  return <div></div>;
};
