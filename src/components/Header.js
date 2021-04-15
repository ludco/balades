import React, { useContext, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { UserContext } from '../providers/UserProvider';
import { auth } from '../firebase.config';

export const Header = ({ history }) => {
  const userCtxt = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  console.log('userinheader', userCtxt.user);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Balades !</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Toutes les balades</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            {userCtxt.user && userCtxt.user.email ? (
              <UncontrolledDropdown nav inNavbar className="me-auto">
                <DropdownToggle nav caret>
                  {userCtxt.user.displayName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/add">Ajouter une balade</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    href="/"
                    onClick={() => {
                      auth.signOut();
                      userCtxt.setUser({});
                    }}
                  >
                    déconnexion <i className="bi bi-power"></i>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>
                <NavLink href="/signin">Connexion</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
