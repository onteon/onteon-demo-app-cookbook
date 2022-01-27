import React, {useEffect, useState} from 'react';
import Home from "../../containers/Home/Home";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../containers/Footer/Footer";
import {getPrincipal} from "../../remote/UserRemoteService";

const LandingPage = () => {
    const [principal, setPrincipal] = useState();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    return (
        <>
            <NavBar transparent={true} principal={principal}/>
            <Home id="home"/>
            <Footer/>
        </>
    );
}

export default LandingPage;