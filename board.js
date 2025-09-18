import React from 'react';
import Card from './card';
import './Board.css';

function Board({ cards, onCardClick, flippedCards, matchedCards }) {
  return (
    <div className="board">
      {cards.map((card) =>
        matchedCards.includes(card.id) ? null : (
          <Card
            key={card.id}
            card={card}
            onClick={onCardClick}
            flipped={flippedCards.includes(card.id)}
            matched={matchedCards.includes(card.id)}
          />
        )
      )}
    </div>
  );
}

export default Board;