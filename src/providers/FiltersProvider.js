/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from './UserProvider';

export const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);
  const [filteredWalks, setFilteredWalks] = useState([]);
  const [boundedWalks, setBoundedWalks] = useState([]);
  const walks = useSelector((state) => state.walks);
  const userCtxt = useContext(UserContext);

  // walks to display are set to "all walks" if there are no filters
  useEffect(() => {
    filters.length > 1
      ? setFilteredWalks(applyFilters())
      : setFilteredWalks(walks);
  }, [filters.length, walks]);

  // sector filter
  const isShownBySector = (walk) => {
    const sectorFilters = filters.filter((filter) => filter.group === 'sector');

    if (!sectorFilters.length) return true;
    return sectorFilters.some((filter) => filter.fnc(walk));
  };

  // Difficulty filter
  const isShownByDifficulty = (walk) => {
    const diffFilters = filters.filter(
      (filter) => filter.group === 'difficulty'
    );
    if (!diffFilters.length) return true;
    return diffFilters.some((filter) => filter.fnc(walk));
  };

  //User filter
  const isShownByUser = (walk, uid) => {
    const userFilters = filters.filter((filter) => filter.group === 'user');
    if (!userFilters.length) return true;
    return userFilters.some((filter) => filter.fnc(walk, uid));
  };

  // Map bounds filter
  const isShownByBounds = (walk, boundedW) => {
    const userFilters = filters.filter((filter) => filter.group === 'map');
    if (!userFilters.length) return true;
    return userFilters.some((filter) => filter.fnc(walk, boundedW));
  };

  // Handle all the filters
  const applyFilters = () => {
    return walks.filter((walk) => {
      const showBySector = isShownBySector(walk);
      const showByDifficulty = isShownByDifficulty(walk);
      const shownByUser = isShownByUser(walk, userCtxt.user?.uid);
      const shownByBounds = isShownByBounds(walk, boundedWalks);
      return showBySector && showByDifficulty && shownByUser && shownByBounds;
    });
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        applyFilters,
        filteredWalks,
        setFilteredWalks,
        setBoundedWalks,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersProvider;
