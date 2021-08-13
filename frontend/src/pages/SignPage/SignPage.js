import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Col, Row} from "antd";
import backgroundImage from "../../assets/images/background-1.jpg";
import SignInForm from "../../containers/SignInForm/SignInForm";
import SignUpForm from "../../containers/SignInForm/SignUpForm";
import {getPrincipal} from "../../remote/UserRemoteService";

const SignPage = () => {
    const [principal, setPrincipal] = useState();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    return (
        <>
            <NavBar transparent={false} principal={principal}/>
            <Row style={{marginTop: "49px"}}>
                <Col sm={16}>
                    <div id="in"/>
                    <SignInForm/>
                    <div id="up"/>
                    <SignUpForm/>
                </Col>
                <Col sm={8}>
                    <div style={{
                        backgroundSize: "cover",
                        backgroundPositionY: "center",
                        backgroundPositionX: "right",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url('${backgroundImage}')`,
                        height: "100vh",
                        width: "50vw",
                        position: "fixed"
                    }}
                    />
                </Col>
            </Row>
        </>
    );
}

export default SignPage;