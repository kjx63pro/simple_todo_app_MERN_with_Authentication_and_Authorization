import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  const toggle = () => {};
  return (
    <div>
      <Navbar bg='success' variant='dark' expand='sm' className='mb-5'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            React-Todo-App
          </Navbar.Brand>
          <Navbar.Toggle onClick={toggle}></Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/about'>
                About
              </Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/register'>
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to='login'>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
