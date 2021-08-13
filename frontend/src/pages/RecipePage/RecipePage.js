import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Col, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import ContentCard from "../../components/ContentCard/ContentCard";
import Footer from "../../containers/Footer/Footer";
import ImageWithTitle from "../../components/ImageWithTitle/ImageWithTitle";
import DescriptionContentCard from "../../components/DescriptionContentCard/DescriptionContentCard";
import IngredientsContentCard from "../../components/IngredientsContentCard/IngredientsContentCard";
import DirectionsContentCard from "../../components/DirectionsContentCard/DirectionsContentCard";
import {getRecipeById} from "../../remote/RecipeRemoteService";
import {CONTEXT_PATH} from "../../properties";
import {getPrincipal} from "../../remote/UserRemoteService";

const {Content} = Layout;

const RecipePage = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState();
    const [principal, setPrincipal] = useState();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    useEffect(() => {
        getRecipeById(id)
            .then(response => setRecipe(response.data))
            .catch(error => window.open(`${CONTEXT_PATH}/recipes`)); // todo redirect to proper error page (404, 403, 401 etc)
    }, [id]);

    return (
        <>
            <Layout style={{padding: "0 100px", minHeight: "100vh"}}>
                <NavBar transparent={false} principal={principal}/>
                <Content>
                    {
                        recipe ?
                            <>
                                <ImageWithTitle imageUrl={recipe.imageUri} title={recipe.title}/>
                                <Row>
                                    <Col sm={24}>
                                        <Row>
                                            <Col sm={24} style={{padding: "0 24px 24px 24px"}}>
                                                <DescriptionContentCard description={recipe.description}/>
                                            </Col>
                                        </Row>
                                        <Row gutter={24} style={{padding: "24px"}}>
                                            <Col sm={6}>
                                                <IngredientsContentCard ingredients={recipe.ingredients}/>
                                            </Col>
                                            <Col sm={18}>
                                                <DirectionsContentCard directions={recipe.directions}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
                            :
                            <ContentCard title="Loading..."/>
                    }
                </Content>
            </Layout>
            <Footer/>
        </>
    );
}

export default RecipePage;