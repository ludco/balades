import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner } from 'reactstrap';
import { doGetSettings } from '../actions';
import { WalkForm } from '../components/WalkForm';

export const WalksAddition = ({ history }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state);
  useEffect(() => {
    if (!settings) {
      dispatch(doGetSettings());
    }
  }, []);
  if (!settings.length) {
    return (
      <Container className="full">
        <Spinner className="spinner" color="primary" />
      </Container>
    );
  }
  return <WalkForm history={history} settings={settings} />;
};
