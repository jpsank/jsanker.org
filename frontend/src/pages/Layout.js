import { Outlet, Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = () => {
    return (
        <Container fluid className="p-0">
            <Navbar bg="light" expand="lg" className="my-4 px-sm-5 px-3">
                <LinkContainer to="/">
                    <Navbar.Brand className="fs-4 me-5">
                        jsanker.org
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="fs-5 flex-grow-1 justify-content-evenly" activeKey={window.location.pathname}>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/projects">
                            <Nav.Link>Projects</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/blogs">
                            <Nav.Link>Blogs</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Container fluid>
                <Outlet />
            </Container>

            <Container fluid className="bg-dark text-white py-5">
                <p className="text-center m-0">© 2023 Julian Sanker</p>
            </Container>
        </Container>
    );
};

export default Layout;
