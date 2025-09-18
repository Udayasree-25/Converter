import React, { useState, useEffect, useCallback } from 'react';
import Board from './board';
import './App.css';

const CARD_CONTENTS = ['🍎', '🍌', '🍒', '🍓', '🍇', '🥝', '🍊', '🍍'];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCardIds, setFlippedCardIds] = useState([]);
  const [matchedCardIds, setMatchedCardIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [score, setScore] = useState(0);

  const initializeGame = useCallback(() => {
    const pairedContents = [...CARD_CONTENTS, ...CARD_CONTENTS];
    const shuffledContents = shuffleArray(pairedContents);

    const initialCards = shuffledContents.map((content, index) => ({
      id: index,
      content: content,
    }));

    setCards(initialCards);
    setFlippedCardIds([]);
    setMatchedCardIds([]);
    setGameOver(false);
    setScore(0);
    setIsWaiting(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = useCallback((card) => {
    if (
      gameOver ||
      matchedCardIds.includes(card.id) ||
      isWaiting ||
      flippedCardIds.includes(card.id)
    ) {
      return;
    }

    // If already two cards are flipped, ignore further clicks
    if (flippedCardIds.length === 2) {
      return;
    }

    const newFlipped = [...flippedCardIds, card.id];
    setFlippedCardIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsWaiting(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard.content === secondCard.content) {
        // Match found
        setTimeout(() => {
          setMatchedCardIds((prev) => [...prev, firstId, secondId]);
          setFlippedCardIds([]);
          setIsWaiting(false);
          setScore((prevScore) => prevScore + 1);
        }, 700); // Slightly shorter delay for snappier feel
      } else {
        // No match
        setTimeout(() => {
          setFlippedCardIds([]);
          setIsWaiting(false);
        }, 1200); // Slightly longer delay so player can see both cards
      }
    }
  }, [flippedCardIds, matchedCardIds, cards, gameOver, isWaiting]);

  useEffect(() => {
    if (matchedCardIds.length === cards.length && cards.length > 0) {
      setGameOver(true);
    }
  }, [matchedCardIds, cards.length]);

  return (
    <div className="App">
      <h1>React Memory Game</h1>
      <p>Score: {score}</p>
      {gameOver && <p className="game-over-message">Congratulations! You won!</p>}
      <Board
        cards={cards}
        onCardClick={handleCardClick}
        flippedCards={flippedCardIds}
        matchedCards={matchedCardIds}
      />
      <button onClick={initializeGame} disabled={!gameOver}>
        Restart Game
      </button>
    </div>
  );
}

export default App;