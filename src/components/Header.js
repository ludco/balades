import React, { useContext, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { UserContext } from '../providers/UserProvider';
import { auth } from '../firebase.config';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLogoutUser } from '../actions';

export const Header = ({ history }) => {
  const dispatch = useDispatch();
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
              <Link to="/">Toutes les balades</Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            {userCtxt.user && userCtxt.user.email ? (
              <UncontrolledDropdown nav inNavbar className="me-auto">
                <DropdownToggle nav caret>
                  {userCtxt.user.displayName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/my-walks" className="link">
                      Mes balades
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/add" className="link">
                      Ajouter une balade
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    href="/"
                    onClick={() => {
                      auth.signOut();
                      dispatch(doLogoutUser());
                      userCtxt.setUser(null);
                    }}
                  >
                    déconnexion <i className="bi bi-power"></i>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>
                <Link to="/signin">Connexion</Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
