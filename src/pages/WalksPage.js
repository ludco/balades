import React, { useEffect } from 'react';
import { WalksList } from '../components/WalksList';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWalks } from '../actions';

export const WalksPage = ({ history }) => {
  const dispatch = useDispatch();
  const { walks, loading } = useSelector((state) => state);

  useEffect(() => {
    if (!walks.length) dispatch(getWalks());
  }, []);
  if (loading) {
    return 'loading';
  }
  return (
    <Container>
      {walks.length > 0 && <WalksList walks={walks} history={history} />}
    </Container>
  );
};
