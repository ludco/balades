import React, { useContext } from 'react';
import { FiltersContext } from '../providers/FiltersProvider';
import { Walk } from './Walk';

export const WalksList = ({ walks, history }) => {
  const filtersCtxt = useContext(FiltersContext);
  return (
    <div>
      {filtersCtxt.filteredWalks.map((walk) => {
        return <Walk key={walk.name} walk={walk} history={history} />;
      })}
    </div>
  );
};
