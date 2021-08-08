/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { WalksList } from '../components/WalksList';
import {
  Container,
  Spinner,
  ToastBody,
  Alert,
  Row,
  Col,
  Button,
  Toast,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocationMarker } from '../components/LocationMarker';
import { setToastFalse } from '../actions';
import { Bounds } from '../components/Bounds';
import SideBar from '../components/Sidebar';
import { FiltersContext } from '../providers/FiltersProvider';

export const WalksPage = ({ history }) => {
  const { walks, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const filtersCtxt = useContext(FiltersContext);

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

  // Handle result number
  const showResultsNumber = () => {
    const number = filtersCtxt.filteredWalks.length;
    const plural = number < 2 ? '' : 's';
    return `${number} résultat${plural}`;
  };

  // filter by map bounds
  const getAndSetBounds = (bounds) => {
    const mapFiltered = walks.filter((walk) => {
      return (
        walk.latlng &&
        walk.latlng.latitude < bounds._northEast.lat &&
        walk.latlng.latitude > bounds._southWest.lat &&
        walk.latlng.longitude > bounds._southWest.lng &&
        walk.latlng.longitude < bounds._northEast.lng
      );
    });
    filtersCtxt.setBoundedWalks(mapFiltered);
    filtersCtxt.setFilters((prev) => [
      ...prev,
      {
        name: 'map',
        group: 'map',
        fnc: (w, mapW) => mapW.includes(w),
      },
    ]);
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
              {filtersCtxt.filteredWalks.map((walk) => (
                <LocationMarker key={walk.id} walk={walk} />
              ))}
            </MapContainer>
          </Col>
          <Col lg="7">
            <WalksList walks={filtersCtxt.filteredWalks} history={history} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
