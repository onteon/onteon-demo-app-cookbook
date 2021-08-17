import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";

import Footer from "../../containers/Footer/Footer";

import {getPrincipal} from "../../remote/UserRemoteService";
import {addRecipe} from "../../remote/RecipeRemoteService";
import {CONTEXT_PATH} from "../../properties";
import BasicDataFormItemsContentCard
    from "../../components/BasicDataFormItemsContentCard/BasicDataFromItemsContentCard";
import IngredientsFormItemsContentCard
    from "../../components/IngredientsFormItemsContentCard/IngredientsFormItemsContentCard";
import DirectionsFormItemsContentCard
    from "../../components/DirectionsFormItemsContentCard/DirectionsFormItemsContentCard";

const {Content} = Layout;

const AddRecipePage = () => {
    const [principal, setPrincipal] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    function onFinishAddRecipe(data) {
        const {title, description, ingredients, directions} = data;
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
                                <BasicDataFormItemsContentCard image={image} setImage={setImage}/>
                            </Col>
                            <Col sm={12}>
                                <IngredientsFormItemsContentCard/>
                            </Col>
                            <Col sm={24}>
                                <DirectionsFormItemsContentCard/>
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