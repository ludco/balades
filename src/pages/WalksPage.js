import React, { useEffect } from 'react';
import { WalksList } from '../components/WalksList';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWalks } from '../actions';

export const WalksPage = () => {
  const dispatch = useDispatch();
  const walks = useSelector((state) => state.walks);
  useEffect(() => {
    if (!walks.lenght) dispatch(getWalks());
  }, []);

  return (
    <Container>{walks.length > 0 && <WalksList walks={walks} />}</Container>
  );
};
