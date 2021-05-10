/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';

import { Container, Spinner } from 'reactstrap';
import { WalkForm } from '../components/WalkForm';
import { SettingsContext } from '../providers/SettingsProvider';

export const WalksAddition = ({ history }) => {
  const settingsCtxt = useContext(SettingsContext);
  if (!settingsCtxt.settings.length) {
    return (
      <Container className="full">
        <Spinner className="spinner" color="primary" />
      </Container>
    );
  }
  return <WalkForm history={history} settings={settingsCtxt.settings} />;
};
