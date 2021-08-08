/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Spinner } from 'reactstrap';
import { WalkForm } from '../components/WalkForm';

export const WalksAddition = ({ history }) => {
  const storeSettings = useSelector((state) => state.settings);
  if (!storeSettings.length) {
    return (
      <Container className="full">
        <Spinner className="spinner" color="primary" />
      </Container>
    );
  }
  return <WalkForm history={history} settings={storeSettings} />;
};
