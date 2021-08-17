import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Button, Col, Layout, Row} from "antd";
import {getPrincipal} from "../../remote/UserRemoteService";
import ContentCard from "../../components/ContentCard/ContentCard";
import {CONTEXT_PATH} from "../../properties";
import Footer from "../../containers/Footer/Footer";
import {getIsMd, getIsSm} from "../../utils/ResponsiveUtils";

const {Content} = Layout;

const ErrorPage = () => {
    const [principal, setPrincipal] = useState();
    const [status, setStatus] = useState();
    const [message, setMessage] = useState();

    const isMd = getIsMd().call();
    const isSm = getIsSm().call();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    useEffect(() => {
        const searchParams = new URL(window.location.href).searchParams;
        setStatus(searchParams.get("status"));
        setMessage(searchParams.get("message"));
    }, []);

    return (
        <>
            <Layout style={{padding: isSm ? "0 100px" : "0 20px"}}>
                <NavBar transparent={false} principal={principal}/>
                <Content>
                    <ContentCard>
                        <Row align="middle" style={{height: "100vh"}}>
                            <Col span={24} style={{textAlign: "center"}}>
                                <h1 style={{fontSize: isMd ? "160px" : "100px", marginBottom: "10px"}}>{status}</h1>
                                <h2 style={{color: "#8c8c8c"}}>{message}</h2>

                                <Button type="link" href={`${CONTEXT_PATH}`}>Go to home page</Button>
                            </Col>
                        </Row>
                    </ContentCard>
                </Content>
            </Layout>
            <Footer/>
        </>
    );
}

export default ErrorPage;