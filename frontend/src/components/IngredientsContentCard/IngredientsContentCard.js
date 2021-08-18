import React from 'react';
import {Checkbox} from "antd";
import ContentCard from "../../components/ContentCard/ContentCard";

const IngredientsContentCard = props => {
    const {ingredients} = props;

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
        </ContentCard>
    );
}

export default IngredientsContentCard;