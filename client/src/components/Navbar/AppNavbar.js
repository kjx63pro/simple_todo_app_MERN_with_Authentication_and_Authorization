import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  const authContext = useContext(AuthContext);
  const toggle = () => {};

  const onLogout = () => {
    authContext.logout();
  };

  const guestLinks = (
    <Fragment>
      <Nav.Link as={Link} to='/register'>
        Sign Up
      </Nav.Link>
      <Nav.Link as={Link} to='login'>
        Login
      </Nav.Link>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <Nav.Link>Hello {authContext.user && authContext.user.name}</Nav.Link>
      <Nav.Link as={Link} to='#!' onClick={onLogout}>
        Logout
      </Nav.Link>
    </Fragment>
  );

  return (
    <div>
      <Navbar bg='success' variant='dark' expand='sm' className='mb-5'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            React-Todo-App
          </Navbar.Brand>
          <Navbar.Toggle onClick={toggle}></Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className='ml-auto'>
              {authContext.isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
