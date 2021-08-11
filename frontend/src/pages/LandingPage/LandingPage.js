import React from 'react';
import Home from "../../containers/Home/Home";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../containers/Footer/Footer";

const LandingPage = () => (
    <>
        <NavBar />
        <Home id="#home" />
        <Footer />
    </>
);

export default LandingPage;