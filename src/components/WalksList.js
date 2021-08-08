import React from 'react';
import { useSelector } from 'react-redux';
import { Walk } from './Walk';

export const WalksList = ({ walks, history }) => {
  const filteredWalks = useSelector((state) => state.filteredWalks);
  const walksToDisplay = filteredWalks.length ? filteredWalks : walks;
  console.log('filteredWalks', filteredWalks);
  return (
    <div>
      {walksToDisplay.map((walk) => {
        return <Walk key={walk.name} walk={walk} history={history} />;
      })}
    </div>
  );
};
