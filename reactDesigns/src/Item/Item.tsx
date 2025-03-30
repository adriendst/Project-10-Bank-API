import React from "react";
import "./Item.scss";

function Item({ imageName, title, message }: { imageName: string; title: string; message: string }) {
    return (
        <div className="feature-item">
            <img src={`./${imageName}.png`} alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{message}</p>
        </div>
    );
}

export default Item;
