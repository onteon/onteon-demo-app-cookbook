import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {API_BASE_URL} from "../../properties";
import {useMediaQuery} from "react-responsive";

const SignInForm = () => {
    const [globalErrorMessages, setGlobalErrorMessages] = useState([]);

    const isMd = useMediaQuery({minWidth: 768});

    useEffect(() => {
        const searchParams = new URL(window.location.href.replace("#in", "").replace("#up", "")).searchParams;
        if (searchParams.has("error")) {
            setGlobalErrorMessages(["Wrong username or password."])
        }
    }, []);

    return (
        <Row style={{height: "100vh"}} align="middle" justify="center">
            <Col>
                <h1>Sign in</h1>
                <form action={`${API_BASE_URL}/api/login`} method="POST">
                    <Form.ErrorList
                        style={{color: "pink"}}
                        errors={globalErrorMessages.map(error => <p style={{color: "#f5222d"}}>{error}</p>)}
                    />

                    <Form.Item
                        label={isMd ? "Username" : ""}
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                        labelCol={isMd ? {offset: 0, span: 6} : {}}
                    >
                        <Input name="username" placeholder={!isMd ? "Username" : ""}/>
                    </Form.Item>

                    <Form.Item
                        label={isMd ? "Password" : ""}
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                        labelCol={isMd ? {offset: 0, span: 6} : {}}
                    >
                        <Input.Password name="password" placeholder={!isMd ? "Password" : ""}/>
                    </Form.Item>

                    <p>
                        Don't have an account yet? <a href="#up">Sign Up</a>.
                    </p>

                    <Form.Item wrapperCol={isMd ? {offset: 6} : {offset: 9}}>
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                </form>
            </Col>
        </Row>
    );
}

export default SignInForm;