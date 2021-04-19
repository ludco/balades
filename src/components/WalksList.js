import React from 'react';
import { Walk } from './Walk';

export const WalksList = ({ walks, history }) => {
  return (
    <div>
      {walks.map((walk) => {
        return <Walk key={walk.name} walk={walk} history={history} />;
      })}
    </div>
  );
};
