import React, { useContext, useEffect, useState } from 'react';
import { Nav } from 'reactstrap';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import { SettingsContext } from '../providers/SettingsProvider';
import { useDispatch, useSelector } from 'react-redux';
import { doFilterWalks } from '../actions';

const SideBar = ({ isOpen, toggle }) => {
  const walks = useSelector((state) => state.walks);
  const dispatch = useDispatch();
  const settingsCtxt = useContext(SettingsContext);
  const difficulties = settingsCtxt.settings.find(
    (setting) => setting.difficulty
  );
  const sectors = settingsCtxt.settings.find((setting) => setting.sector);
  const difficultiesSubMenu = difficulties.difficulty;
  const sectorsSubMenu = sectors.sector;

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(doFilterWalks({ walks: walks, filters: filters }));
  }, [filters.length]);

  const addFilter = (name, group, fnc) => {
    setFilters((currentFilters) => [...currentFilters, { name, group, fnc }]);
  };

  const removeFilter = (name, group) => {
    setFilters((currentFilters) =>
      currentFilters.filter((f) => !(f.name === name && f.group === group))
    );
  };

  console.log('filters', filters);

  return (
    <div className={classNames('sidebar', { 'is-open': isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: '#fff' }}>
          &times;
        </span>
        <h3>Filtres</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <SubMenu
            title="Par secteur"
            group="sector"
            items={sectorsSubMenu}
            filters={filters}
            doRemoveFilter={removeFilter}
            doAddFilter={addFilter}
          />
          <SubMenu
            title="Par difficulté"
            group="difficulty"
            items={difficultiesSubMenu}
            filters={filters}
            doRemoveFilter={removeFilter}
            doAddFilter={addFilter}
          />
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
