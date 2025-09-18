
// src/components/Card.js
import React from 'react';
import './Card.css'; // We'll create this CSS file next

function Card({ card, onClick, flipped, matched }) {
  return (
    <div
      className={`card ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`}
      onClick={() => onClick(card)}
    >
      <div className="card-inner">
        <div className="card-front">?</div> {/* Placeholder */}
        <div className="card-back">{card.content}</div> {/* The actual content */}
      </div>
    </div>
  );
}

export default Card;
// ... rest of your Board.js code