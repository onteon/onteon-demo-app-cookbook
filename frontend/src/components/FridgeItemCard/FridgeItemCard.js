import React from 'react';
import {Card, Col, Row} from "antd";
import {getIsLg} from "../../utils/ResponsiveUtils";

const FridgeItemCard = props => {
    const {name, category, amount, unit} = props;

    const isLg = getIsLg().call();

    return (
        <Card style={{width: isLg ? "450px" : "100%"}}>
            <Row>
                <Col flex="auto">
                    <h4>{name}</h4>
                </Col>
                <Col>
                    <h4 style={{fontStyle: "italic"}}>{`${amount}${unit}`}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 style={{color: "#999999"}}>{category}</h5>
                </Col>
            </Row>
        </Card>
    );
}

export default FridgeItemCard;