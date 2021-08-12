import React, {useEffect, useState} from 'react';
import {Button, Col, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import ContentCard from "../../components/ContentCard/ContentCard";
import Footer from "../../containers/Footer/Footer";
import RecipeSearchResultCard from "../../components/RecipeSearchResultCard/RecipeSearchResultCard";

const {Content} = Layout;

const dummyRecipes = [...Array(6).keys()]
    .map(i => {
            return {
                id: i,
                title: `Some super delicious food nr ${i + 1}`,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec orci eget ligula vulputate vestibulum sit amet et urna. Aenean vitae mollis orci. Aenean massa velit, tincidunt in arcu varius, molestie iaculis orci. Nulla in aliquam sapien, eu ullamcorper lectus. Mauris nec viverra odio. Aliquam posuere sem at urna gravida, vitae posuere enim vestibulum. Proin sit amet vestibulum turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec orci eget ligula vulputate vestibulum sit amet et urna. Aenean vitae mollis orci. Aenean massa velit, tincidunt in arcu varius, molestie iaculis orci. Nulla in aliquam sapien, eu ullamcorper lectus. Mauris nec viverra odio. Aliquam posuere sem at urna gravida, vitae posuere enim vestibulum. Proin sit amet vestibulum turpis. ",
            }
        }
    );

const RecipesListPage = () => {
    const [recipes, setRecipes] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [hasMorePages, setHasMorePages] = useState(true)

    useEffect(() => {
        setRecipes(dummyRecipes);
        setCurrentPage(1);
    }, []);

    function loadMore() {
        setRecipes([...recipes, ...dummyRecipes])
        setCurrentPage(currentPage + 1)
        if (currentPage > 4) {
            setHasMorePages(false)
        }
    }

    return (
        <Layout>
            <NavBar transparent={false}/>
            <Content>
                <Row style={{marginTop: "125px", minHeight: "100vh"}}>
                    <Col>
                        <ContentCard title="Your recipes">
                            <Row gutter={[24, 24]} justify="center">
                                {
                                    recipes.length === 0
                                        ? <h1>Not found recipes</h1>
                                        : recipes.map(recipe => (
                                            <RecipeSearchResultCard
                                                id={recipe.id}
                                                title={recipe.title}
                                                description={recipe.description}
                                                key={recipe.key}
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
                                                    onClick={() => loadMore()}
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