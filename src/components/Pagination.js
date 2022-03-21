import React from 'react';

function Pagination({ cardsPerPage, totalCards, paginate, prevPage, nextPage, currentPage }) {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalCards/cardsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <div className='pagination'>
            <button className='pagination__prev' onClick={prevPage} disabled={(currentPage===1) ? true : false}></button>
            <ul className='pagination__list'>
                {
                    pageNumbers.map(number => (
                        <li className='page-item' key={number}>
                            <a className='page-link' href="!#" onClick={() => paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <button className='pagination__next' onClick={nextPage} disabled={(currentPage===pageNumbers.length) ? true : false}></button>
        </div>
    )
}

export default Pagination;