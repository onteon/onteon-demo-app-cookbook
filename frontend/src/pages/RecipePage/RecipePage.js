import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Col, Layout, Row} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import ContentCard from "../../components/ContentCard/ContentCard";
import Footer from "../../containers/Footer/Footer";
import foodImage from "../../assets/images/food/waffles.jpg"
import ImageWithTitle from "../../components/ImageWithTitle/ImageWithTitle";
import DescriptionContentCard from "../../components/DescriptionContentCard/DescriptionContentCard";
import IngredientsContentCard from "../../components/IngredientsContentCard/IngredientsContentCard";
import DirectionsContentCard from "../../components/DirectionsContentCard/DirectionsContentCard";

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
    imageUrl: foodImage
}

const RecipePage = () => {
    const {id} = useParams();
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
                                <ImageWithTitle imageUrl={recipe.imageUrl} title={recipe.title}/>
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