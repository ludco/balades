import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Collapse, NavItem, NavLink, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

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

  const filterExists = (name, group) => {
    return (
      filters.find((f) => f.name === name && f.group === group) !== undefined
    );
  };

  const toggleFilter = (name, group, fnc) => {
    const args = [name, group, fnc];
    if (filterExists(name, group)) {
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
            <Row>
              <Button
                size="sm"
                className="mt-1 ml-4 filter-button"
                color={filterExists(item, group) ? 'secondary' : 'primary'}
                onClick={() =>
                  toggleFilter(item, group, (w) => w[group] === item)
                }
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
