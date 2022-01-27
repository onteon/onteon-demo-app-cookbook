import React from 'react';
import {getIsLg, getIsMd} from "../../utils/ResponsiveUtils";

const ContentCard = props => {
    const isLg = getIsLg().call();
    const isMd = getIsMd().call();

    const padding = isLg ? "22px 59px 22px 59px" : isMd ? "22px 35px 22px 35px" : "22px 10px 22px 10px";

    return (
        <div style={{
            backgroundColor: "white",
            padding: padding,
            height: "100%"
        }}>
            <h1 style={{fontSize: props.titleFontSize ? props.titleFontSize : "42px", color: "#ABA9A9"}}>{props.title}</h1>
            <div style={{marginTop: "21px"}}>
                {props.children}
            </div>
        </div>
    );
}

export default ContentCard;