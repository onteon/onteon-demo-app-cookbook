import React, {useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {signUp} from "../../remote/UserRemoteService";

const SignInForm = () => {
    const [globalErrorMessages, setGlobalErrorMessages] = useState([]);

    function addNewUser(values) {
        console.log(values)
        const {username, password, confirmPassword} = values;
        signUp(username, password, confirmPassword)
            .then(response => {
                setGlobalErrorMessages([]);
                window.open(`/cookbook/sign#in`, "_self")
            })
            .catch(error => {
                setGlobalErrorMessages([error.response.data.message])
            })
    }

    return (
        <Row style={{height: "100vh"}} align="middle" justify="center">
            <Col>
                <h1>Sign up</h1>
                <Form
                    onFinish={addNewUser}
                    name="signUpForm"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                >
                    <Form.ErrorList
                        style={{color: "pink"}}
                        errors={globalErrorMessages.map(error => <p style={{color: "#f5222d"}}>{error}</p>)}
                    />

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
                        name="confirmPassword"
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
}

export default SignInForm;