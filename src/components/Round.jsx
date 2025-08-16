import React from 'react';
import { usePlayers } from './Players';
import { useDeck } from './Deck';
import OrderCard from './OrderCard';

function Round() {
  const {
    players,
    returnActiveNumberOfPlayers,
    returnPlayer,
    updateOrderPile,
    returnActiveColors,
    updateHand,
    returnHand,
    returnOrderPile,
    drawFromOrderPile,
  } = usePlayers();

  const {
    deck,
    shuffle,
    drawTopCardFaceUp,
    removeOvenCard,
    removeIngredient,
    removeColorOrders,
  } = useDeck();

  const hasRun = React.useRef(false);
  const [_, forceUpdate] = React.useReducer(x => x + 1, 0);

  const colorList = ['red', 'yellow', 'brown', 'purple', 'green'];
  const activeColors = returnActiveColors();

  const removeInitialIngredientCards = () => {
    const numPlayers = returnActiveNumberOfPlayers();
    const ratios = { 4: 1, 3: 3, 2: 5, 1: 5 };

    colorList.forEach(color => {
      for (let i = 0; i < ratios[numPlayers]; i++) {
        removeIngredient(color);
      }
    });
  };

  const giveOutOrdersShuffled = () => {
    colorList.forEach(color => {
      const orderPile = removeColorOrders(color);
      for (let i = orderPile.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [orderPile[i], orderPile[j]] = [orderPile[j], orderPile[i]];
      }
      updateOrderPile(color, orderPile);
    });
  };

  const createInitialHands = () => {
    const tempHands = {};
    activeColors.forEach(color => {
      tempHands[color] = [];
    });

    for (let c = 0; c < 6; c++) {
      activeColors.forEach(color => {
        const { card } = drawTopCardFaceUp();
        tempHands[color].push(card);
      });
    }

    activeColors.forEach(color => {
      updateHand(color, tempHands[color]);
    });

  };

  React.useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    removeInitialIngredientCards();
    removeOvenCard();
    giveOutOrdersShuffled();
    shuffle(); 
    createInitialHands();

    forceUpdate();
  }, []);

  const orderPileForActiveColor = returnOrderPile(activeColors[0]);


  React.useEffect(() => {
    let full = true;
    
    activeColors.forEach(color => {
      if (returnOrderPile(color) == 0) full = false;
    })
    
    if (full) {
      console.log(players);

      activeColors.forEach(color => {
        drawFromOrderPile(color);
      })
    }
  }, [orderPileForActiveColor]);

  const renderHand = (color) => {
    const hand = returnHand(color);
    return (
      <div className='flex w-full bg-blue-500 h-full relative'>
        {hand.map((card, index) => (
          <div
            key={index}
            className='absolute -translate-1/2'
            style={{
              left: `${50 + Math.cos((120 - ((60 / (hand.length + 1))) * (index + 1)) * (Math.PI / 180)) * 50}%`,
              top: `${100 - Math.sin((120 - ((60 / (hand.length + 1))) * (index + 1)) * (Math.PI / 180)) * 50}%`,
            }}
          >
            {card}
          </div>
        ))}
      </div>
    );
  };

  const renderOrderPile = (color) => {
    const orderPile = returnOrderPile(color);
    return (
      <div className='flex flex-wrap bg-green-200 w-full'>
        {orderPile.map((data, index) => (
          <OrderCard key={index} {...data} isFaceUp={true} />
        ))}
      </div>
    );
  };

  return (
    <div className='bg-red-100 h-full flex h-screen'>
      {
        activeColors.map((color, i) => (
          <div key={i} className='flex flex-col w-full h-full'>
            <div className='bg-red-500 w-full h-1/2 flex flex-col justify-center'>
              <div className='bg-purple-100'>{color}'s Hand:</div>
              <div className='bg-stone-900 w-full h-full'>{renderHand(activeColors[i])}</div>
            </div>
            <div className='bg-green-500 w-full h-1/2 flex flex-col'>
              <div>{color}'s Order Pile:</div>
              {renderOrderPile(activeColors[i])}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Round;