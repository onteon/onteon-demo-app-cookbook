import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const NavBar = () => {
    const brandStyle = {
        color: "#fff"
    }

    const linkStyle = {
        color: "#f5f5f5"
    }

    return (
        <Navbar fixed="top" style={{backgroundColor: "rgba(0, 0, 0, 0)"}} expand="lg">
            <Container>
                <Navbar.Brand style={brandStyle} href="/">Cookbook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav style={{marginRight: "0"}}>
                        <Nav.Link href="/sign#in" style={linkStyle}>Sign In</Nav.Link>
                        <Nav.Link href="/sign#up" style={linkStyle}>Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;