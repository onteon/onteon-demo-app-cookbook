import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const NavBar = props => {
    const {transparent} = props;

    const brandStyle = {
        color: "#fff"
    }

    const linkStyle = {
        color: "#f5f5f5"
    }

    return (
        <Navbar fixed="top" bg={transparent ? "": "light"} style={{backgroundColor: "rgba(0, 0, 0, 0)"}} expand="lg">
            <Container>
                <Navbar.Brand style={transparent ? brandStyle : {}} href="/">Cookbook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav style={{marginRight: "0"}}>
                        <Nav.Link href="/sign#in" style={transparent ? linkStyle : {}}>Sign In</Nav.Link>
                        <Nav.Link href="/sign#up" style={transparent ? linkStyle : {}}>Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;