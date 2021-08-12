import React from 'react';
import ContentCard from "../../components/ContentCard/ContentCard";

const DirectionsContentCard = props => {
    const {directions} = props;

    return (
        <ContentCard title="Directions">
            {
                directions.map((direction, i) =>
                    <ul key={i}>
                        <li style={{fontSize: "18px"}}>{direction}</li>
                    </ul>
                )
            }
        </ContentCard>
    );
}

export default DirectionsContentCard;