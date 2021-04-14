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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Trier
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>par secteur</DropdownItem>
                <DropdownItem>par difficulté</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>
            {userCtxt.user && userCtxt.user.email ? (
              <NavLink
                href="/"
                onClick={() => {
                  auth.signOut();
                  userCtxt.setUser({});
                }}
              >
                {userCtxt.displayName} - Déconnexion
              </NavLink>
            ) : (
              <NavLink href="/signin">Connexion</NavLink>
            )}
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};
