import { Outlet, Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = () => {
    return (
        <Container fluid className="px-sm-5">
            <Navbar bg="light" expand="lg" className="my-4 px-sm-0 px-3">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        JS
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/about">
                            <Nav.Link>ABOUT</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/projects">
                            <Nav.Link>PROJECTS</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/blogs">
                            <Nav.Link>BLOGS</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <Nav.Link>CONTACT</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Container fluid>
                <Outlet />
            </Container>

            <Container fluid className="mt-5">
                <hr />
                <p className="text-center">© 2023 Julian Sanker</p>
            </Container>
        </Container>
    );
};

export default Layout;
