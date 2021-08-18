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
import {getPrincipal} from "../../remote/UserRemoteService";
import {redirectError} from "../../utils/RedirectUtils";
import {getIsLg} from "../../utils/ResponsiveUtils";

const {Content} = Layout;

const RecipePage = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState();
    const [principal, setPrincipal] = useState();

    const isLg = getIsLg().call();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    useEffect(() => {
        getRecipeById(id)
            .then(response => setRecipe(response.data))
            .catch(error => redirectError(error));
    }, [id]);

    return (
        <>
            <Layout style={{padding: isLg ? "0 100px" : "0 0", minHeight: "100vh"}}>
                <NavBar transparent={false} principal={principal}/>
                <Content>
                    {
                        recipe ?
                            <>
                                <ImageWithTitle imageUrl={recipe.imageUri} title={recipe.title}/>
                                <Row>
                                    <Col xs={24}>
                                        <Row>
                                            <Col xs={24} style={{padding: "0 24px 24px 24px"}}>
                                                <DescriptionContentCard description={recipe.description}/>
                                            </Col>
                                        </Row>
                                        <Row gutter={[24, 24]} style={{padding: "24px"}}>
                                            <Col xs={24} xl={10} xxl={6}>
                                                <IngredientsContentCard ingredients={recipe.ingredients}/>
                                            </Col>
                                            <Col xs={24} xl={14} xxl={18}>
                                                <DirectionsContentCard directions={recipe.directions}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
                            : <div style={{marginTop: "100px"}}><ContentCard title="Loading..."/></div>
                    }
                </Content>
            </Layout>
            <Footer/>
        </>
    );
}

export default RecipePage;