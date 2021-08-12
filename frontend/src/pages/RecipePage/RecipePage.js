import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Checkbox, Col, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import ContentCard from "../../components/ContentCard/ContentCard";
import Footer from "../../containers/Footer/Footer";

const {Content} = Layout;

const dummyRecipe = {
    id: 123,
    title: `Waffles`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec orci eget ligula vulputate vestibulum sit amet et urna. Aenean vitae mollis orci. Aenean massa velit, tincidunt in arcu varius, molestie iaculis orci. Nulla in aliquam sapien, eu ullamcorper lectus. Mauris nec viverra odio. Aliquam posuere sem at urna gravida, vitae posuere enim vestibulum. Proin sit amet vestibulum turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec orci eget ligula vulputate vestibulum sit amet et urna. Aenean vitae mollis orci. Aenean massa velit, tincidunt in arcu varius, molestie iaculis orci. Nulla in aliquam sapien, eu ullamcorper lectus. Mauris nec viverra odio. Aliquam posuere sem at urna gravida, vitae posuere enim vestibulum. Proin sit amet vestibulum turpis. ",
    ingredients: [
        "1 i 1/2 szklanki mąki pszennej",
        "1 i 1/2 łyżeczki proszku do pieczenia",
        "szczypta soli",
        "2 łyżeczki cukru pudru lub kryształu",
        "1 łyżka cukru wanilinowego",
        "2 jaja",
        "1/2 szklanki oleju roślinnego (np. słonecznikowego) lub roztopionego masła",
        "1 i 1/3 szklanki mleka"
    ],
    directions: [
        "Mąkę wsypać do miski, dodać proszek do pieczenia, sól, cukier, cukier wanilinowy. Wszystko wymieszać a następnie dodać jajka, olej roślinny oraz mleko. Zmiksować mikserem na gładką masę, tylko do połączenia się składników. Ciasto można odstawić aby odpoczęło (na około 15 minut), ale nie jest to konieczne.",
        "Rozgrzać gofrownicę. Gofry piec przez około 3 - 3,5 minuty lub przez czas podany w instrukcji gofrownicy. Nakładamy ciasto chochlą i wypukłą stroną łyżki rozprowadzamy ciasto dokładnie po całej powierzchni.",
        "Gofry po upieczeniu odkładać na metalową kratkę. Posypać cukrem pudrem i polać syropem klonowym. Lub podawać z ulubionymi dodatkami np. marmoladą, dżemem, owocami i bitą śmietaną."
    ],
    imageUrl: "/static/media/waffles.fc6c1c42.jpg"
}

const RecipePage = () => {
    const id = useParams();
    console.log(id);
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        setRecipe(dummyRecipe);
    }, []);

    return (
        <>
            <Layout style={{padding: "0 100px", minHeight: "100vh"}}>
                <NavBar transparent={false}/>
                <Content>
                    {
                        recipe ?
                            <>
                                <Row
                                    style={{
                                        marginTop: "70px",
                                        backgroundImage: `url("${recipe.imageUrl}")`,
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        height: "500px"
                                    }}
                                    align="middle"
                                >
                                    <Col sm={24}>
                                        <div
                                            style={{
                                                width: "100%",
                                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                                textAlign: "center"
                                            }}
                                        >
                                            <h1 style={{color: "#f0f0f0", fontSize: "60px"}}>
                                                {recipe.title}
                                            </h1>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={24}>
                                        <Row>
                                            <Col sm={24} style={{padding: "0 24px 24px 24px"}}>
                                                <ContentCard title="Description">
                                                    <p style={{fontSize: "16px", fontStyle: "italic"}}>
                                                        {recipe.description}
                                                    </p>
                                                </ContentCard>
                                            </Col>
                                        </Row>
                                        <Row gutter={24} style={{padding: "24px"}}>
                                            <Col sm={6}>
                                                <ContentCard title="Ingredients">
                                                    {
                                                        recipe.ingredients.map(ingredient =>
                                                            <div>
                                                                <Checkbox
                                                                    style={{
                                                                        fontSize: "16px",
                                                                        fontWeight: "bold",
                                                                        color: "#002766"
                                                                    }}>
                                                                    {ingredient}
                                                                </Checkbox>
                                                            </div>
                                                        )
                                                    }
                                                </ContentCard>
                                            </Col>
                                            <Col sm={18}>
                                                <ContentCard title={"Directions"}>
                                                    {
                                                        recipe.directions.map(direction =>
                                                            <ul>
                                                                <li style={{fontSize: "18px"}}>{direction}</li>
                                                            </ul>
                                                        )
                                                    }
                                                </ContentCard>
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