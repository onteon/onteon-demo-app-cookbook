import React from 'react';
import {Button, Card, Col, Dropdown, Menu} from "antd";
import {MenuUnfoldOutlined} from '@ant-design/icons';
import {CONTEXT_PATH} from "../../properties";
import {deleteById} from "../../remote/RecipeRemoteService";

const RecipeSearchResultCard = props => {
    const {id, title, description, deleteFunction} = props;

    function deleteRecipe(id) {
        deleteById(id)
            .then(response => deleteFunction(id))
            .catch(error => console.log(error.response))
    }

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
                                    <Menu.Item danger onClick={() => deleteRecipe(id)}>
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