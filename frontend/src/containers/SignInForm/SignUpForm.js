import React from 'react';
import {Button, Col, Form, Input, Row} from "antd";

const SignInForm = () => (
    <Row style={{height: "100vh"}} align="middle" justify="center">
        <Col>
            <h1>Sign up</h1>
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

                <Form.Item
                    label="Confirm password"
                    name="confirm-password"
                    rules={[{required: true, message: 'Please confirm your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
);

export default SignInForm;