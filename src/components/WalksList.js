import React from 'react';

import { Walk } from './Walk';

export const WalksList = ({ walks, history }) => {
  return (
    <div id="listContainer">
      <div id="list">
        {walks.map((walk) => {
          return <Walk key={walk.name} walk={walk} history={history} />;
        })}
      </div>
    </div>
  );
};
