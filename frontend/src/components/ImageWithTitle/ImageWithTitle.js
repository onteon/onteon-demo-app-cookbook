import React from 'react';
import {Col, Row} from "antd";

const ImageWithTitle = props => {
    const {imageUrl, title} = props;

    return (
        <Row
            style={{
                marginTop: "70px",
                backgroundImage: `url("${imageUrl}")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "#d9d9d9",
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
                        {title}
                    </h1>
                </div>
            </Col>
        </Row>
    );
}

export default ImageWithTitle;