import React from 'react';
import ContentCard from "../../components/ContentCard/ContentCard";

const DescriptionContentCard = props => {
    const {description} = props;

    return (
        <ContentCard title="Description">
            <p style={{fontSize: "16px", fontStyle: "italic"}}>
                {description}
            </p>
        </ContentCard>
    );
}

export default DescriptionContentCard;