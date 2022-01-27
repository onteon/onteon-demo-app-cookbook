import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../containers/Footer/Footer";

import {getPrincipal} from "../../remote/UserRemoteService";
import BasicDataFormItemsContentCard
    from "../../components/BasicDataFormItemsContentCard/BasicDataFromItemsContentCard";
import IngredientsFormItemsContentCard
    from "../../components/IngredientsFormItemsContentCard/IngredientsFormItemsContentCard";
import DirectionsFormItemsContentCard
    from "../../components/DirectionsFormItemsContentCard/DirectionsFormItemsContentCard";
import {useParams} from "react-router-dom";
import ContentCard from "../../components/ContentCard/ContentCard";
import {getRecipeById, updateRecipe} from "../../remote/RecipeRemoteService";
import {redirect, redirectError} from "../../utils/RedirectUtils";
import {useMediaQuery} from "react-responsive";

const {Content} = Layout;

const EditRecipePage = () => {
    const [principal, setPrincipal] = useState();
    const [recipe, setRecipe] = useState();
    const [image, setImage] = useState();
    const {id} = useParams();

    const isMd = useMediaQuery({minWidth: 768});
    const isSm = useMediaQuery({minWidth: 576});

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    useEffect(() => {
        getRecipeById(id)
            .then(response => setRecipe(response.data))
            .catch(error => redirectError(error));
    }, [id]);

    function onFinishUpdateRecipe(data) {
        const {title, description, ingredients, directions} = data;
        updateRecipe(id, title, description, ingredients, directions, image)
            .then(response => redirect(`/recipe/${id}`))
            .catch(error => console.error(error.response))
    }

    return (
        <>
            <Layout style={{padding: isMd ? "0 100px" : isSm ? "0 25px" : "0 0", minHeight: "100vh"}}>
                <NavBar transparent={false} principal={principal}/>
                {
                    recipe ?
                        <Content style={{marginTop: "100px"}}>
                            <Form name="recipeForm" onFinish={onFinishUpdateRecipe}>
                                <Row gutter={[isMd ? 24 : 0, 24]}>
                                    <Col xs={24} lg={12}>
                                        <BasicDataFormItemsContentCard
                                            image={image}
                                            setImage={setImage}
                                            title={recipe.title}
                                            description={recipe.description}
                                            obligatoryImage={false}
                                        />
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <IngredientsFormItemsContentCard ingredients={recipe.ingredients}/>
                                    </Col>
                                    <Col xs={24}>
                                        <DirectionsFormItemsContentCard directions={recipe.directions}/>
                                    </Col>
                                    <Col xs={24}>
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