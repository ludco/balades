import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Collapse, NavItem, NavLink, Row } from 'reactstrap';

const SubMenu = ({
  title,
  items,
  group,
  filters,
  doAddFilter,
  doRemoveFilter,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);

  // check if filter already exist
  const filterExists = (name) => {
    return (
      filters.find((f) => f.name === name && f.group === group) !== undefined
    );
  };

  // handle apply or remove filter
  const toggleFilter = (name, fnc) => {
    const args = [name, group, fnc];
    if (filterExists(name)) {
      doRemoveFilter.apply(null, args);
    } else {
      doAddFilter.apply(null, args);
    }
  };

  return (
    <div>
      <NavItem
        onClick={toggle}
        className={classNames({ 'menu-open': !collapsed })}
      >
        {items ? (
          <NavLink className="dropdown-toggle">{title}</NavLink>
        ) : (
          <NavLink>{title}</NavLink>
        )}
      </NavItem>
      {items && (
        <Collapse
          isOpen={!collapsed}
          navbar
          className={classNames('items-menu', { 'mb-1': !collapsed })}
        >
          {items.map((item, index) => (
            <Row key={index}>
              <Button
                size="sm"
                className="mt-1 ml-4 filter-button"
                color={filterExists(item) ? 'secondary' : 'primary'}
                onClick={() => toggleFilter(item, (w) => w[group] === item)}
              >
                {item}
              </Button>
            </Row>
          ))}
        </Collapse>
      )}
    </div>
  );
};

export default SubMenu;
