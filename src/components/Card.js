import React, { useState } from 'react';

function Card({ name, url, remove, card, addSelectedCard, removeSelectedCard, allSelected }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const cardDeleteButtonClassName = isHovered ? 'card__trash' : 'card__trash card__trash_hide';
    const inactiveCardSelectButtonClassName = isHovered ? 'card__checkbox' : 'card__checkbox card__checkbox_hide';
    const activeCardSelectButtonClassName = (isSelected || allSelected) ? 'card__checkbox card__checkbox_active' : 'card__checkbox_hide';
    const cardSelectButtonClassName = (isSelected || allSelected) ? activeCardSelectButtonClassName : inactiveCardSelectButtonClassName;

    function handleMouseHover() {
        setIsHovered(true)
    }
    function handleMouseLeave() {
        setIsHovered(false)
    }
    function handleSelect() {
        setIsSelected(!isSelected);
        isSelected ? removeSelectedCard(card) : addSelectedCard(card)
    }
    

    return (
        <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave} className="card">
            <button className={cardSelectButtonClassName} type="button" onClick={handleSelect}></button>
            <button className={cardDeleteButtonClassName} type="button" onClick={() => remove(card)}></button>
            <img className="card__img" src={url} alt="" />
            <p className="card__description">{name}</p>
        </div>
    )
}

export default Card;