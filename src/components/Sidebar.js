import React, { useContext, useEffect, useState } from 'react';
import { Nav } from 'reactstrap';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import { FiltersContext } from '../providers/FiltersProvider';
import { useSelector } from 'react-redux';

const SideBar = ({ isOpen, toggle }) => {
  const filtersCtxt = useContext(FiltersContext);
  const storeSettings = useSelector((state) => state.settings);
  const difficulties = storeSettings.find((setting) => setting.difficulty);
  const sectors = storeSettings.find((setting) => setting.sector);
  const [settingsMenus, setSettingsMenus] = useState({});

  useEffect(() => {
    if (difficulties && sectors)
      setSettingsMenus({
        diff: difficulties.difficulty,
        sector: sectors.sector,
      });
  }, [storeSettings.length]);

  const subMenus = [
    { title: 'par secteur', items: settingsMenus.sector, group: 'sector' },
    { title: 'par dificulté', items: settingsMenus.diff, group: 'difficulty' },
  ];

  // Add a filter object {name, group, fn} in filters context
  const addFilter = (name, group, fnc) => {
    filtersCtxt.setFilters((currentFilters) => [
      ...currentFilters,
      { name, group, fnc },
    ]);
  };

  // remove filter if exist
  const removeFilter = (name, group) => {
    filtersCtxt.setFilters((currentFilters) =>
      currentFilters.filter((f) => !(f.name === name && f.group === group))
    );
  };

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
          {subMenus.map((subMenu, index) => (
            <SubMenu
              key={index}
              title={subMenu.title}
              group={subMenu.group}
              items={subMenu.items}
              filters={filtersCtxt.filters}
              doRemoveFilter={removeFilter}
              doAddFilter={addFilter}
            />
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
