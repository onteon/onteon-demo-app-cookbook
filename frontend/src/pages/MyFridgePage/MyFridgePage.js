import React, {useEffect, useState} from 'react';
import {Col, Layout, Row, Select} from "antd";
import NavBar from "../../components/NavBar/NavBar";
import ContentCard from "../../components/ContentCard/ContentCard";
import Footer from "../../containers/Footer/Footer";
import {getPrincipal} from "../../remote/UserRemoteService";
import {getIsLg} from "../../utils/ResponsiveUtils";
import FridgeItemCard from "../../components/FridgeItemCard/FridgeItemCard";
import {getMyFridge} from "../../remote/FridgeRemoteService";

const {Content} = Layout;
const {Option} = Select;

const MyFridgePage = () => {
    const [items, setItems] = useState([])
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [principal, setPrincipal] = useState();

    const isLg = getIsLg().call();

    useEffect(() => {
        getPrincipal()
            .then(response => setPrincipal(response.data))

        getMyFridge()
            .then(response => {
                console.log(response.data)
                setItems(response.data)
            })
    }, []);

    function getAllCategories() {
        const categories = items.map(item => item.category);
        categories.unshift("All");
        return [...new Set(categories)];
    }

    return (
        <Layout>
            <NavBar transparent={false} principal={principal}/>
            <Content>
                <Row style={{marginTop: "125px", minHeight: "100vh"}}>
                    <Col sm={24}>
                        <ContentCard title="What's in my fridge?">
                            {
                                items.length > 0 ?
                                    <Row justify="center" style={{marginBottom: "20px"}}>
                                        <Col>
                                            Category:
                                            <Select
                                                defaultValue="All"
                                                style={{width: 120}}
                                                onChange={setCategoryFilter}
                                                bordered={false}
                                            >
                                                {
                                                    getAllCategories()
                                                        .map(category => <Option value={category}>{category}</Option>)
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                    : ""
                            }
                            <Row gutter={[24, 24]} justify="center">
                                {
                                    items.length === 0
                                        ?
                                        <Col sm={24}>
                                            <h3 style={{color: "#bfbfbf"}}>Fridge is empty :/</h3>
                                        </Col>
                                        :
                                        items
                                            .filter(item => categoryFilter === "All" || item.category === categoryFilter)
                                            .map(item => (
                                                <Col style={isLg ? {} : {width: "100%"}}>
                                                    <FridgeItemCard
                                                        key={item.name}
                                                        name={item.name}
                                                        category={item.category}
                                                        amount={item.amount}
                                                        unit={item.unit}
                                                    />
                                                </Col>
                                            ))
                                }
                            </Row>
                        </ContentCard>
                    </Col>
                </Row>
            </Content>
            <Footer/>
        </Layout>
    );
}

export default MyFridgePage;