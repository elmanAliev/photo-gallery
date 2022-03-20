import React, { useState, useEffect } from 'react';
import './Main.css'
import Card from './Card';
import data from '../data.js'

function Main() {
    const [cards, setCards] = useState(data);
    const [selectedCards, setSelectedCards] = useState([]);
    const [allSelected, setAllSelected] = useState(false);

    function handleRemoveCard(card) {
        setCards(cards.filter(c => c.name !== card.name))
    }

    function handleAddSelectedCard (card) {
        setSelectedCards([...selectedCards, card])
    }

    function handleRemoveSelectedCard (card) {
        setSelectedCards(selectedCards.filter(c => c.name !== card.name))
    }

    function handleRemoveSelectedCards() {
        setCards(cards.filter(c => selectedCards.indexOf(c) === -1));
        selectedCards(selectedCards)
    }

    function handleSelectAll() {
        setSelectedCards([...cards])
        setAllSelected(!allSelected)
    }

    useEffect(() => {
        function handleEscapeKey(event) {
          if (event.code === 'Escape') {
            setAllSelected(false)
            setSelectedCards([])
          }
        }
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
      }, [allSelected])
   

    return (
        <>
            <div className="content">
                <p className="content__counter">{cards.length} изображений</p>
                <div className="content__cards">
                {cards.map((card) => {
                    return <Card
                        name = {card.name}
                        url = {card.sample_url}
                        key = {card.name}
                        card = {card}
                        remove = {handleRemoveCard}
                        addSelectedCard = {handleAddSelectedCard}
                        removeSelectedCard = {handleRemoveSelectedCard}
                        allSelected = {allSelected}
                    />
                    })}
                </div>
            </div>
            <div className="control">
                <div className="control__wrapper">
                    <div className="control__info">
                        <button className="control__select-all" type="button" onClick={handleSelectAll}></button>
                        <p className="control__text"><span className="control__num">{selectedCards.length}</span> изображений выбрано</p>
                    </div>
                    <button className="control__delete" type="button" onClick={handleRemoveSelectedCards}></button>
                    <p className="control__esc">Для отмены нажмите ESC</p>
                </div>
            </div>
        </>
    )
}

export default Main;