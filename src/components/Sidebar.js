import React, { useContext } from 'react';
import { Nav } from 'reactstrap';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import { SettingsContext } from '../providers/SettingsProvider';

const SideBar = ({ isOpen, toggle }) => {
  const settingsCtxt = useContext(SettingsContext);
  const difficulties = settingsCtxt.settings.find(
    (setting) => setting.difficulty
  );
  const sectors = settingsCtxt.settings.find((setting) => setting.sector);
  const difficultiesSubMenu = difficulties.difficulty.map((difficulty) => {
    return { title: difficulty, target: difficulty };
  });
  const sectorsSubMenu = sectors.sector.map((sector) => {
    return { title: sector, target: sector };
  });
  console.log('difficultiesSubMenu', difficultiesSubMenu);

  const submenus = [sectorsSubMenu, difficultiesSubMenu];
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
          <SubMenu title="Par secteur" items={submenus[0]} />
          <SubMenu title="Par difficulté" items={submenus[1]} />
          <SubMenu title="Par durée" />
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
