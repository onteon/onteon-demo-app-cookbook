import React from 'react';
import {Button, Col, Layout, Row} from "antd";

import backgroundImage from '../../assets/images/background-1.jpg';
import {CONTEXT_PATH} from "../../properties";
import {getIsXs} from "../../utils/ResponsiveUtils";

const {Content} = Layout;

const buttonStyle = {
    backgroundColor: "#262626",
    color: "#fff",
    border: 0,
    width: "200px"
}

const Home = () => {
    const isXs = getIsXs().call();

    return (
        <Layout>
            <Content style={{
                backgroundImage: `url('${backgroundImage}')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "100vh"
            }}>
                <Row style={{height: "100%"}} align="middle">
                    <Col xs={{span: 24, offset: 0}}
                         md={{span: 16, offset: 1}}
                         lg={{span: 12, offset: 1}}
                         xl={{span: 10, offset: 1}}
                         style={{backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "100px 0"}}
                    >
                        <h1 style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: isXs ? "60px" : "80px",
                            marginBottom: "0px"
                        }}>
                            Cookbook
                        </h1>
                        <p style={{color: "white", textAlign: "center", fontSize: "20px", fontStyle: "italic"}}>
                            Add your favourite recipes.
                        </p>
                        <Row style={{marginTop: "80px", paddingBottom: "30px"}} justify="center" gutter={[24, 12]}>
                            <Col>
                                <Button
                                    href={`${CONTEXT_PATH}/sign#in`}
                                    shape="round"
                                    size='large'
                                    style={buttonStyle}
                                >
                                    Sign in
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    href={`${CONTEXT_PATH}/sign#up`}
                                    shape="round"
                                    size='large'
                                    style={buttonStyle}
                                >
                                    Sign up
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Home;