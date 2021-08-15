import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {CONTEXT_PATH, ONTEON_URL} from "../../properties";
import onteonLogo from "../../assets/images/onteon-logo.svg";
import onteonLogoWhite from "../../assets/images/onteon-logo-white.svg";

const NavBar = props => {
    const {transparent, principal} = props;

    const brandStyle = {
        color: "#fff"
    }

    const linkStyle = {
        color: "#f5f5f5"
    }

    return (
        <Navbar fixed="top" bg={transparent ? "" : "light"} style={{backgroundColor: "rgba(0, 0, 0, 0)"}} expand="lg">
            <Container>
                <Navbar.Brand
                    style={{width: "100px"}}
                    href={ONTEON_URL}
                >

                </Navbar.Brand>
                <Navbar.Brand
                    style={transparent ? brandStyle : {}}
                    href={`${CONTEXT_PATH}/`}
                >
                    Cookbook
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav style={{marginRight: "0"}}>
                        {
                            props.principal ?
                                <>
                                    <Nav.Link
                                        style={transparent ? linkStyle : {}}
                                    >
                                        <span style={{fontWeight: "bold"}}>Hello {principal.username}!</span>
                                    </Nav.Link>
                                    <Nav.Link
                                        href={`${CONTEXT_PATH}/add-recipe`}
                                        style={transparent ? linkStyle : {}}
                                    >
                                        Add recipe
                                    </Nav.Link>
                                    <Nav.Link
                                        href={`${CONTEXT_PATH}/recipes`}
                                        style={transparent ? linkStyle : {}}
                                    >
                                        Recipes
                                    </Nav.Link>
                                    <Nav.Link
                                        href={`${CONTEXT_PATH}/logout`}
                                        style={transparent ? linkStyle : {}}
                                    >
                                        Logout
                                    </Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link
                                        href={`${CONTEXT_PATH}/sign#in`}
                                        style={transparent ? linkStyle : {}}
                                    >
                                        Sign In
                                    </Nav.Link>
                                    <Nav.Link
                                        href={`${CONTEXT_PATH}/sign#up`}
                                        style={transparent ? linkStyle : {}}
                                    >
                                        Sign Up
                                    </Nav.Link>
                                </>
                        }
                        <Nav.Link
                            href={ONTEON_URL}
                            style={{width: "70px"}}
                        >
                            <img src={transparent ? onteonLogoWhite : onteonLogo} alt="onteon logo"/>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;