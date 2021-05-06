/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { WalksList } from '../components/WalksList';
import { Container, Spinner, ToastBody, Alert, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'reactstrap';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocationMarker } from '../components/LocationMarker';
import { setToastFalse } from '../actions';
import { Bounds } from '../components/Bounds';

export const WalksPage = ({ history }) => {
  const { walks, loading, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  // Sorting
  const [walksToDisplay, setWalksToDisplay] = useState();
  useEffect(() => {
    if (history.location?.pathname === '/my-walks') {
      setWalksToDisplay(walks.filter((walk) => walk.userId === user.uid));
    } else {
      setWalksToDisplay(walks);
    }
  }, [history.location.pathname, loading]);

  //Toast
  const toast = useSelector((state) => state.toast);
  useEffect(() => {
    if (toast.status) {
      setTimeout(() => {
        //setToastVisible({ type: '', message: '', status: false });
        dispatch(setToastFalse());
      }, 2000);
    }
  }, [walks.length]);

  const showResultsNumber = () => {
    const number = user
      ? walksToDisplay
        ? walksToDisplay.length
        : walks.length
      : walks.length;
    const plural = number < 2 ? '' : 's';
    return `${number} résultat${plural}`;
  };

  const getAndSetBounds = (bounds) => {
    const filtered = walks.filter((walk) => {
      return (
        walk.latlng &&
        walk.latlng.latitude < bounds._northEast.lat &&
        walk.latlng.latitude > bounds._southWest.lat &&
        walk.latlng.longitude > bounds._southWest.lng &&
        walk.latlng.longitude < bounds._northEast.lng
      );
    });
    setWalksToDisplay(filtered);
  };
  if (loading) {
    return (
      <Container className="full">
        <Spinner className="spinner" color="primary" />
      </Container>
    );
  }
  return (
    <Container>
      <Toast isOpen={toast.status} className={`toast ${toast.type}`}>
        <ToastBody>{toast.message}</ToastBody>
      </Toast>
      <Alert color="info" className="mt-2">
        {showResultsNumber()}
      </Alert>
      <Row>
        <Col lg="5">
          <MapContainer
            className="map"
            center={[45.75, 4.85]}
            zoom={7}
            scrollWheelZoom={true}
          >
            <Bounds getAndSetBounds={getAndSetBounds} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {walks.map((walk) => (
              <LocationMarker key={walk.id} walk={walk} />
            ))}
          </MapContainer>
        </Col>
        <Col lg="7">
          <WalksList
            walks={user ? (walksToDisplay ? walksToDisplay : walks) : walks}
            history={history}
          />
        </Col>
      </Row>
    </Container>
  );
};
