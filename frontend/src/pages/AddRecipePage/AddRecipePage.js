import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";

import Footer from "../../containers/Footer/Footer";

import {getPrincipal} from "../../remote/UserRemoteService";
import {addRecipe} from "../../remote/RecipeRemoteService";
import BasicDataFormItemsContentCard
    from "../../components/BasicDataFormItemsContentCard/BasicDataFromItemsContentCard";
import IngredientsFormItemsContentCard
    from "../../components/IngredientsFormItemsContentCard/IngredientsFormItemsContentCard";
import DirectionsFormItemsContentCard
    from "../../components/DirectionsFormItemsContentCard/DirectionsFormItemsContentCard";
import {redirect} from "../../utils/RedirectUtils";
import {getIsMd, getIsSm} from "../../utils/ResponsiveUtils";

const {Content} = Layout;

const AddRecipePage = () => {
    const [principal, setPrincipal] = useState();
    const [image, setImage] = useState();

    const isMd = getIsMd().call();
    const isSm = getIsSm().call();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    function onFinishAddRecipe(data) {
        const {title, description, ingredients, directions} = data;
        addRecipe(title, description, ingredients, directions, image)
            .then(response => redirect(`/recipe/${response.data.recipeId}`))
            .catch(error => console.error(error.response))
    }

    return (
        <>
            <Layout style={{padding: isMd ? "0 100px" : isSm ? "0 25px" : "0 0", minHeight: "100vh"}}>
                <NavBar transparent={false} principal={principal}/>
                <Content style={{marginTop: "100px"}}>
                    <Form name="recipeForm" onFinish={onFinishAddRecipe}>
                        <Row gutter={[isMd ? 24 : 0, 24]}>
                            <Col xs={24} lg={12}>
                                <BasicDataFormItemsContentCard image={image} setImage={setImage}/>
                            </Col>
                            <Col xs={24} lg={12}>
                                <IngredientsFormItemsContentCard/>
                            </Col>
                            <Col xs={24}>
                                <DirectionsFormItemsContentCard/>
                            </Col>
                            <Col xs={24}>
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