/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { WalksList } from '../components/WalksList';
import {
  Container,
  Spinner,
  ToastBody,
  Alert,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'reactstrap';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocationMarker } from '../components/LocationMarker';
import { setToastFalse } from '../actions';
import { Bounds } from '../components/Bounds';
import SideBar from '../components/Sidebar';
import { uniq } from 'lodash';

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
  //Sidebar
  const [sidebarIsOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  //Toast
  const toast = useSelector((state) => state.toast);
  useEffect(() => {
    if (toast.status) {
      setTimeout(() => {
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
    if (filtered.length) {
      setWalksToDisplay(
        uniq(filtered.filter((walk) => walksToDisplay.includes(walk)))
      );
    }
  };
  if (loading) {
    return (
      <Container className="full">
        <Spinner className="spinner" color="primary" />
      </Container>
    );
  }
  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
      <Container className="mt-2">
        <Toast isOpen={toast.status} className={`toast ${toast.type}`}>
          <ToastBody>{toast.message}</ToastBody>
        </Toast>
        <Row>
          <Col lg="1" md="2" sm="2" xs="3">
            <Button className="mt-2" color="info" onClick={toggleSidebar}>
              Filtres
            </Button>
          </Col>
          <Col lg="11" md="10" sm="10" xs="9">
            <Alert color="info">{showResultsNumber()}</Alert>
          </Col>
        </Row>
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
    </div>
  );
};
