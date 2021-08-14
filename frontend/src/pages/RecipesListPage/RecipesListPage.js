import React, {useEffect, useState} from 'react';
import {Button, Col, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import ContentCard from "../../components/ContentCard/ContentCard";
import Footer from "../../containers/Footer/Footer";
import RecipeSearchResultCard from "../../components/RecipeSearchResultCard/RecipeSearchResultCard";
import {getUserRecipes} from "../../remote/RecipeRemoteService";
import {getPrincipal} from "../../remote/UserRemoteService";

const {Content} = Layout;
const PAGE_SIZE = 6;

const RecipesListPage = () => {
    const [recipes, setRecipes] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [hasMorePages, setHasMorePages] = useState(true)
    const [principal, setPrincipal] = useState();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))
    }, []);

    function getNextPage() {
        getUserRecipes(currentPage + 1, PAGE_SIZE)
            .then(response => {
                const {last, content} = response.data;
                setHasMorePages(!last);
                setCurrentPage(currentPage + 1);
                setRecipes([...recipes, ...content]);
            })
            .catch(error => console.error(error.response));
    }

    useEffect(() => getNextPage(), []);

    function deleteRecipe(recipeId) {
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    }

    return (
        <Layout>
            <NavBar transparent={false} principal={principal}/>
            <Content>
                <Row style={{marginTop: "125px", minHeight: "100vh"}}>
                    <Col sm={24}>
                        <ContentCard title="Your recipes">
                            <Row gutter={[24, 24]} justify="center">
                                {
                                    recipes.length === 0
                                        ? <Col sm={24}><h1>Not found recipes</h1></Col>
                                        : recipes.map(recipe => (
                                            <RecipeSearchResultCard
                                                id={recipe.id}
                                                title={recipe.title}
                                                description={recipe.description}
                                                key={recipe.key}
                                                deleteFunction={deleteRecipe}
                                            />
                                        ))
                                }
                            </Row>
                            {
                                hasMorePages ?
                                    <Row justify="center">
                                        <Col>
                                            <Button type="text"
                                                    style={{
                                                        fontSize: "42px",
                                                        marginTop: "100px",
                                                        height: "auto",
                                                        color: "#8c8c8c"
                                                    }}
                                                    onClick={getNextPage}
                                            >
                                                Load more
                                            </Button>
                                        </Col>
                                    </Row>
                                    : <></>
                            }
                        </ContentCard>
                    </Col>
                </Row>
            </Content>
            <Footer/>
        </Layout>
    );
}

export default RecipesListPage;