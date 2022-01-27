import React from 'react';
import {Button, Checkbox} from "antd";
import ContentCard from "../../components/ContentCard/ContentCard";
import {CONTEXT_PATH} from "../../properties";

const IngredientsContentCard = props => {
    const {ingredients, recipeId} = props;

    return (
        <ContentCard title="Ingredients">
            {
                ingredients.map((ingredient, i) =>
                    <div key={i}>
                        <Checkbox
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#002766"
                            }}
                        >
                            {ingredient}
                        </Checkbox>
                    </div>
                )
            }
            <Button
                href={`${CONTEXT_PATH}/api/recipe/${recipeId}/shopping-list`}
                style={{borderColor: "#389e0d", color: "#389e0d", marginTop: "35px"}}
            >
                Download shopping list
            </Button>
        </ContentCard>
    );
}

export default IngredientsContentCard;