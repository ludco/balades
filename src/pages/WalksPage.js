/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { WalksList } from '../components/WalksList';
import { Container, Spinner, ToastBody, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'reactstrap';
import { SET_TOAST_TO_FALSE } from '../constants/action-types';

export const WalksPage = ({ history }) => {
  const { walks, loading, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  // Sorting
  const [walksToDisplay, setWalksToDisplay] = useState();
  useEffect(() => {
    if (history.location?.pathname === '/my-walks') {
      setWalksToDisplay(walks.filter((walk) => walk.user.id === user.uid));
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
        dispatch({ type: SET_TOAST_TO_FALSE });
      }, 2000);
    }
  }, [walks.length]);

  const showResultsNumber = () => {
    const number = user
      ? walksToDisplay
        ? walksToDisplay.length
        : walks.length
      : walks.length;
    const plural = number.length < 2 ? '' : 's';
    return `${number} résultat${plural}`;
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

      <WalksList
        walks={user ? (walksToDisplay ? walksToDisplay : walks) : walks}
        history={history}
      />
    </Container>
  );
};
