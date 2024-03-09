import { useState } from 'react';
import './App.css';
import cards from './cards'

const App = () => {

  // set default card
  const defaultCard = {
    "term": "Click the flashcard to flip it",
    "definition": "Good job! Click next to continue to the next card. Good luck!",
    "theme": "start"
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [card, setCard] = useState(defaultCard);
  const [theme, setTheme] = useState("none");
  const [cardSide, setCardSide] = useState(card.term);
  const numOfCards = cards.length;

  const prevCard = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex >= 1 ? prevIndex - 1 : 0;
      setCard(cards[newIndex]);
      setCardSide(cards[newIndex].term);
      setTheme(cards[newIndex].theme);
      return newIndex;
    });
  }
  
  const nextCard = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < cards.length - 1 ? prevIndex + 1 : cards.length - 1;
      setCard(cards[newIndex]);
      setCardSide(cards[newIndex].term);
      setTheme(cards[newIndex].theme);
      return newIndex;
    });
  }  

  const flipCard = () => {
    setCardSide(cardSide === card.term ? card.definition : card.term);


    // Toggle the 'card-flip' class
    const cardButton = document.querySelector('.card-button');
    cardButton.classList.toggle('card-flip');
  }


  return (
    <div className="App">
      <div className="header">
        <h1>Flashcards</h1>
        <h2>Get ready to test your knowledge in all kinds of subjects!</h2>
        <h2>Total number of flashcards: {numOfCards}</h2>
      </div>
      <div className="card">
        <button className="card-button" onClick={flipCard}>{cardSide}</button>
      </div>
      <div className="controls">
        <button onClick={prevCard}>prev</button>
        <button onClick={nextCard}>next</button>
      </div>
    </div>
  )
}

export default App