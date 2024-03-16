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
  const [guess, setGuess] = useState("");
  const [shuffledCards, setShuffledCards] = useState(cards);


  const numOfCards = cards.length;

  const prevCard = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex >= 1 ? prevIndex - 1 : 0;
      setCard(shuffledCards[newIndex]);
      setCardSide(shuffledCards[newIndex].definition);
      setTheme(shuffledCards[newIndex].theme);
      changeColor('input', 'white');
      return newIndex;
    });
  }

  const nextCard = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < shuffledCards.length - 1 ? prevIndex + 1 : shuffledCards.length - 1;
      setCard(shuffledCards[newIndex]);
      setCardSide(shuffledCards[newIndex].definition);
      setTheme(shuffledCards[newIndex].theme);
      changeColor('input', 'white');
      return newIndex;
    });
  }

  const changeColor = (className, color) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
      element.style.background = color;
    });
  }

  const flipCard = () => {
    setCardSide(cardSide === card.term ? card.definition : card.term);
    // Toggle the 'card-flip' class
    const cardButton = document.querySelector('.card-button');
    cardButton.classList.toggle('card-flip');
  }

  const checkAnswer = () => {
    const otherSide = cardSide === card.term ? card.definition : card.term;
    if (otherSide === guess.trim()) {
      flipCard();
      changeColor('input', 'lightgreen');
      setGuess(""); // Clear the input after checking the answer
    } else {
      changeColor('input', 'lightpink');
    }
  }

  const shuffle = () => {
    let array = [...shuffledCards];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffledCards(array);
    setCurrentIndex(0);
    setCard(array[0]);
    setCardSide(array[0].term);
    setTheme(array[0].theme);
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
      <div className="guesses">
        <input className="input" value={guess} onChange={(e) => setGuess(e.target.value)}></input>
        <button onClick={checkAnswer}>check answer</button>
      </div>
      <div className="controls">
        <button onClick={prevCard}>prev</button>
        <button onClick={nextCard}>next</button>
        <button onClick={shuffle}>shuffle</button>
      </div>
    </div>
  )
}

export default App