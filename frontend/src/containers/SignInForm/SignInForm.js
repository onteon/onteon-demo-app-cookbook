import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {API_BASE_URL} from "../../properties";

const SignInForm = () => {
    const [globalErrorMessages, setGlobalErrorMessages] = useState([]);

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
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input name="username"/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password name="password"/>
                    </Form.Item>

                    <p>
                        Don't have an account yet? <a href="#up">Sign Up</a>.
                    </p>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
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