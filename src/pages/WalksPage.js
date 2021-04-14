import { db } from '../firebase.config';
import React, { useState, useEffect } from 'react';
import { WalksList } from '../components/WalksList';
import { WalkForm } from '../components/WalkForm';
import { Container } from 'reactstrap';

export const WalksPage = () => {
  const [walks, setWalk] = useState([]);
  useEffect(() => {
    fetchWalks();
  }, []);

  /**
   * Get Walks documents from firebase
   */
  const fetchWalks = async () => {
    try {
      const response = await db.collection('balades');
      const data = await response.get();
      const walksArray = [];
      data.docs.forEach((item) => {
        walksArray.push(item.data());
      });
      setWalk(walksArray);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {walks.length && <WalksList walks={walks} />}
      <WalkForm />
    </Container>
  );
};
