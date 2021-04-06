import React from 'react';
import { Walk } from './Walk';

export const WalksList = ({ walks }) => {
  return (
    <div>
      {walks.map((walk) => {
        return <Walk key={walk.name} walk={walk} />;
      })}
    </div>
  );
};
