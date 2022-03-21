import React, { useState, useEffect } from 'react';
import Card from './Card';
import Pagination from './Pagination';
import data from '../data.js'

function Main() {
    const [cards, setCards] = useState(data);
    const [selectedCards, setSelectedCards] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);

    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = cards.slice(firstCardIndex, lastCardIndex)

    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
    }

    function prevPage() {
        setCurrentPage(prev => prev-1)
        setAllSelected(false)
    } 
    function nextPage() {
        setCurrentPage(prev => prev+1)
        setAllSelected(false)
    } 

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
        setSelectedCards([])
        setAllSelected(false)
    }

    function handleSelectAll() {
        setSelectedCards([...currentCards])
        setAllSelected(true)
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
                {currentCards.map((card) => {
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
            <Pagination 
                    cardsPerPage={cardsPerPage}
                    totalCards={cards.length}
                    paginate={paginate}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    currentPage={currentPage}
            />
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