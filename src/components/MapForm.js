import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Alert, Container } from 'reactstrap';
import { DraggableMarker } from './DraggableMarker';
import { LocationMarker } from './LocationMarker';

export const MapForm = ({ fromMapForm }) => {
  const center = [45.75, 4.85];
  const fromDraggable = (position) => {
    fromMapForm(position);
  };
  return (
    <Container>
      <Alert color="primary" className="mt-2 flex justify-content-between">
        <span>Déplacer le marqueur pour indiquer le départ </span>
      </Alert>
      <MapContainer
        className="mapform"
        center={center}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <LocationMarker /> */}
        <DraggableMarker center={center} fromDraggable={fromDraggable} />
      </MapContainer>
    </Container>
  );
};
