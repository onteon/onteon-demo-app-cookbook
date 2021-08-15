import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import ContentCard from "../../components/ContentCard/ContentCard";
import Footer from "../../containers/Footer/Footer";

import {getPrincipal} from "../../remote/UserRemoteService";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {addRecipe} from "../../remote/RecipeRemoteService";
import {CONTEXT_PATH} from "../../properties";

const {Content} = Layout;

const AddRecipePage = () => {
    const [principal, setPrincipal] = useState();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    function onFinishAddRecipe(data) {
        const {title, description, ingredients, directions, image} = data;
        addRecipe(title, description, ingredients, directions, image)
            .then(response => window.open(`${CONTEXT_PATH}/recipe/${response.data.recipeId}`, "_self"))
            .catch(error => console.error(error.response))
    }

    return (
        <>
            <Layout style={{padding: "0 100px", minHeight: "100vh"}}>
                <NavBar transparent={false} principal={principal}/>
                <Content style={{marginTop: "100px"}}>
                    <Form name="recipeForm" onFinish={onFinishAddRecipe}>
                        <Row gutter={[24, 24]}>
                            <Col sm={12}>
                                <ContentCard title="Basic data">
                                    <Form.Item
                                        label="Title"
                                        name="title"
                                        rules={[{required: true, message: 'Please input title!'}]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        name="image"
                                        label="Image"
                                        rules={[{required: true, message: 'Please add image!'}]}
                                    >
                                        <input type="file" id="imageInput"/>
                                    </Form.Item>

                                    <Form.Item
                                        name="description"
                                        label="Description"
                                        rules={[{required: true, message: 'Please input description!'}]}
                                    >
                                        <Input.TextArea/>
                                    </Form.Item>
                                </ContentCard>
                            </Col>
                            <Col sm={12}>
                                <ContentCard title="Ingredients">
                                    <Form.List name="ingredients">
                                        {(fields, {add, remove}, {errors}) => (
                                            <>
                                                {
                                                    fields.map(field => (
                                                        <Form.Item
                                                            required={false}
                                                            key={field.key}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                validateTrigger={['onChange', 'onBlur']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        whitespace: true,
                                                                        message: "Please input ingredient",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Input placeholder="Ingredient" style={{width: '60%'}}/>
                                                            </Form.Item>
                                                            <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        </Form.Item>
                                                    ))
                                                }
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        style={{width: '60%'}}
                                                        icon={<PlusOutlined/>}
                                                    />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </ContentCard>
                            </Col>
                            <Col sm={24}>
                                <ContentCard title="Directions">
                                    <Form.List name="directions">
                                        {(fields, {add, remove}, {errors}) => (
                                            <>
                                                {
                                                    fields.map(field => (
                                                        <Form.Item
                                                            required={false}
                                                            key={field.key}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                validateTrigger={['onChange', 'onBlur']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        whitespace: true,
                                                                        message: "Please input direction",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Input.TextArea placeholder="Direction" style={{width: '95%'}}/>
                                                            </Form.Item>
                                                            <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        </Form.Item>
                                                    ))
                                                }
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        style={{width: '100%'}}
                                                        icon={<PlusOutlined/>}
                                                    />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </ContentCard>
                            </Col>
                            <Col sm={24}>
                                <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Content>
            </Layout>
            <Footer/>
        </>
    );
}

export default AddRecipePage;