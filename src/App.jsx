import OrderCard from './components/OrderCard';
import IngredientCard from './components/IngredientCard';
import OvenCard from './components/OvenCard';
import React from 'react';
import { DeckProvider, useDeck } from './components/Deck';

function GameBoard() {
  const { deck, drawTopCardFaceUp, removeAllCardsOfType, shuffle } = useDeck();
  const [drawnCard, setDrawnCard] = React.useState(null);
  const beforeRemovingRef = React.useRef(null);
  const hasRunRef = React.useRef(false);

  React.useEffect(() => {
    if (hasRunRef.current) {
      return;
    }
    hasRunRef.current = true;

    if (beforeRemovingRef.current === null && deck.length > 0) {
      beforeRemovingRef.current = deck[deck.length-1].card;
    }

    removeAllCardsOfType('oven');
    setDrawnCard(drawTopCardFaceUp());
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-5'>
        <div>
          Before Removing:
          {beforeRemovingRef.current}
          After Removing:
          {deck[deck.length - 1].card}
        </div>
    </div>
  );
}

function App() {
  return (
    <DeckProvider>
      <GameBoard />
    </DeckProvider>
  );
}

export default App;