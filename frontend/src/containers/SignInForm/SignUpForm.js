import React, {useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {signUp} from "../../remote/UserRemoteService";
import {redirect} from "../../utils/RedirectUtils";

const SignInForm = () => {
    const [globalErrorMessages, setGlobalErrorMessages] = useState([]);

    function addNewUser(values) {
        const {username, password, confirmPassword} = values;
        signUp(username, password, confirmPassword)
            .then(response => {
                setGlobalErrorMessages([]);
                redirect("/sign#in");
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
                        errors={globalErrorMessages.map(error => <p style={{color: "#f5222d"}}>{error}</p>)}
                    />

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                        labelCol={{offset: 0, span: 9}}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                        labelCol={{offset: 0, span: 9}}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="Confirm password"
                        name="confirmPassword"
                        rules={[{required: true, message: 'Please confirm your password!'}]}
                        labelCol={{offset: 0, span: 9}}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 9, span: 15}}>
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