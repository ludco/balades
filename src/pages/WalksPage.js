import React, { useEffect, useState } from 'react';
import { WalksList } from '../components/WalksList';
import { Container, Spinner, ToastBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getWalks } from '../actions';
import { Toast } from 'reactstrap';

export const WalksPage = ({ history }) => {
  const { walks, loading } = useSelector((state) => state);
  //Toast
  const toast = useSelector((state) => state.toast);
  const [toastVisible, setToastVisible] = useState(toast);

  useEffect(() => {
    if (toastVisible.status) {
      setTimeout(() => {
        setToastVisible({ ...toastVisible, status: false });
      }, 2000);
    }
  }, []);
  if (loading) {
    return (
      <Container className="full">
        <Spinner className="spinner" color="primary" />
      </Container>
    );
  }
  return (
    <Container>
      <Toast
        isOpen={toastVisible.status}
        className={`toast ${toastVisible.type}`}
      >
        <ToastBody>{toastVisible.message}</ToastBody>
      </Toast>
      <WalksList walks={walks} history={history} />
    </Container>
  );
};
