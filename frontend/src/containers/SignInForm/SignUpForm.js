import React, {useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {signUp} from "../../remote/UserRemoteService";
import {redirect} from "../../utils/RedirectUtils";
import {useMediaQuery} from "react-responsive";

const SignInForm = () => {
    const [globalErrorMessages, setGlobalErrorMessages] = useState([]);

    const isMd = useMediaQuery({minWidth: 768});

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
                    labelCol={isMd ? {span: 8} : {}}
                    wrapperCol={isMd ? {span: 16} : {span: 24}}
                    initialValues={{remember: true}}
                >
                    <Form.ErrorList
                        errors={globalErrorMessages.map(error => <p style={{color: "#f5222d"}}>{error}</p>)}
                    />

                    <Form.Item
                        label={isMd ? "Username" : ""}
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                        labelCol={isMd ? {offset: 0, span: 9} : {}}
                    >
                        <Input placeholder={!isMd ? "Username" : ""}/>
                    </Form.Item>

                    <Form.Item
                        label={isMd ? "Password" : ""}
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                        labelCol={isMd ? {offset: 0, span: 9} : {}}
                    >
                        <Input.Password placeholder={!isMd ? "Password" : ""}/>
                    </Form.Item>

                    <Form.Item
                        label={isMd ? "Confirm password" : ""}
                        name="confirmPassword"
                        rules={[{required: true, message: 'Please confirm your password!'}]}
                        labelCol={isMd ? {offset: 0, span: 9} : {}}
                    >
                        <Input.Password placeholder={!isMd ? "Confirm password" : ""}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 9}}>
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