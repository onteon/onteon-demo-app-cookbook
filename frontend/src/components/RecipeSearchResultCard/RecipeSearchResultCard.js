import React from 'react';
import {Button, Card, Col, Dropdown, Menu} from "antd";
import {MenuUnfoldOutlined} from '@ant-design/icons';
import {CONTEXT_PATH} from "../../properties";

const RecipeSearchResultCard = props => {
    const {id, title, description} = props;

    return (
        <Col>
            <Card
                title={title}
                extra={
                    <>
                        <Button type="link" href={`${CONTEXT_PATH}/recipe/${id}`}>
                            Open
                        </Button>
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item danger onClick={() => console.log("remove")}>
                                        Remove
                                    </Menu.Item>
                                </Menu>
                            }
                            trigger={['click']}
                        >
                            <Button
                                type="link"
                                className="ant-dropdown-link"
                                onClick={e => e.preventDefault()}
                                style={{paddingBottom: "4px"}}
                            >
                                <MenuUnfoldOutlined/>
                            </Button>
                        </Dropdown>
                    </>
                }
                style={{maxWidth: 500}}
            >
                <div style={{
                    height: "158px",
                    overflow: "hidden"
                }}>
                    {description}
                </div>
            </Card>
        </Col>

    );
}

export default RecipeSearchResultCard;