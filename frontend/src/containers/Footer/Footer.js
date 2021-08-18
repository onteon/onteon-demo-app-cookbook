import React from 'react';
import {ONTEON_URL} from "../../properties";

const LandingPage = () => (
    <div style={{
        backgroundColor: "#262626",
        textAlign: "center",
        padding: "2px 0",
        fontSize: "16px"
    }}>
        <p style={{color: "#8c8c8c", margin: 0}}>
            Designed by <a href={ONTEON_URL} rel="noreferrer" target="_blank" style={{color: "#8c8c8c", fontWeight: 800}}>Onteon</a>
        </p>
    </div>
);

export default LandingPage;