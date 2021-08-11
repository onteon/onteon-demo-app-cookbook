import React from 'react';
import {Button, Col, Form, Input, Row} from "antd";

const SignInForm = () => (
    <Row style={{height: "100vh"}} align="middle" justify="center">
        <Col>
            <h1>Sign in</h1>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <p>
                    Don't have an account yet? <a href="#up">Sign Up</a>.
                </p>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
);

export default SignInForm;