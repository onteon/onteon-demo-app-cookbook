import React from 'react';
import {Card} from "antd";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {CONTEXT_PATH} from "../../properties";
import {deleteById} from "../../remote/RecipeRemoteService";
import Meta from "antd/es/card/Meta";
import {getIsLg} from "../../utils/ResponsiveUtils";

const RecipeSearchResultCard = props => {
    const {id, title, description, deleteFunction, imageUri} = props;

    const isLg = getIsLg().call();

    function deleteRecipe(id) {
        deleteById(id)
            .then(response => deleteFunction(id))
            .catch(error => console.log(error.response))
    }

    return (
        <Card
            style={{width: isLg ? "450px" : "100%"}}
            cover={
                <a href={`${CONTEXT_PATH}/recipe/${id}`}>
                    <div style={{
                        width: "100%",
                        height: "300px",
                        backgroundImage: `url('${CONTEXT_PATH}${imageUri}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}/>
                </a>
            }
            actions={[
                <a href={`${CONTEXT_PATH}/edit-recipe/${id}`}><EditOutlined key="edit" style={{color: "#1890ff"}}/></a>,
                <DeleteOutlined key="delete" style={{color: "#f5222d"}} onClick={() => deleteRecipe(id)}/>
            ]}
        >
            <Meta
                title={<a href={`${CONTEXT_PATH}/recipe/${id}`}>{title}</a>}
                description={description}
                style={{
                    height: "156px",
                    overflow: "hidden"
                }}
            />
        </Card>
    );
}

export default RecipeSearchResultCard;