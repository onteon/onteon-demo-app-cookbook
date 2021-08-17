import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../containers/Footer/Footer";

import {getPrincipal} from "../../remote/UserRemoteService";
import {CONTEXT_PATH} from "../../properties";
import BasicDataFormItemsContentCard
    from "../../components/BasicDataFormItemsContentCard/BasicDataFromItemsContentCard";
import IngredientsFormItemsContentCard
    from "../../components/IngredientsFormItemsContentCard/IngredientsFormItemsContentCard";
import DirectionsFormItemsContentCard
    from "../../components/DirectionsFormItemsContentCard/DirectionsFormItemsContentCard";
import {useParams} from "react-router-dom";
import ContentCard from "../../components/ContentCard/ContentCard";
import {getRecipeById, updateRecipe} from "../../remote/RecipeRemoteService";

const {Content} = Layout;

const EditRecipePage = () => {
    const [principal, setPrincipal] = useState();
    const [recipe, setRecipe] = useState();
    const [image, setImage] = useState();
    const {id} = useParams();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    useEffect(() => {
        getRecipeById(id)
            .then(response => setRecipe(response.data))
            .catch(error => window.open(`${CONTEXT_PATH}/recipes`));
    }, [id]);

    function onFinishUpdateRecipe(data) {
        const {title, description, ingredients, directions} = data;
        updateRecipe(id, title, description, ingredients, directions, image)
            .then(response => window.open(`${CONTEXT_PATH}/recipe/${id}`, "_self"))
            .catch(error => console.error(error.response))
    }

    return (
        <>
            <Layout style={{padding: "0 100px", minHeight: "100vh"}}>
                <NavBar transparent={false} principal={principal}/>
                {
                    recipe ?
                        <Content style={{marginTop: "100px"}}>
                            <Form name="recipeForm" onFinish={onFinishUpdateRecipe}>
                                <Row gutter={[24, 24]}>
                                    <Col sm={12}>
                                        <BasicDataFormItemsContentCard
                                            image={image}
                                            setImage={setImage}
                                            title={recipe.title}
                                            description={recipe.description}
                                            obligatoryImage={false}
                                        />
                                    </Col>
                                    <Col sm={12}>
                                        <IngredientsFormItemsContentCard ingredients={recipe.ingredients}/>
                                    </Col>
                                    <Col sm={24}>
                                        <DirectionsFormItemsContentCard directions={recipe.directions}/>
                                    </Col>
                                    <Col sm={24}>
                                        <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                                            Update
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Content>
                        : <div style={{marginTop: "100px"}}><ContentCard title="Loading..."/></div>
                }
            </Layout>
            <Footer/>
        </>
    );
}

export default EditRecipePage;