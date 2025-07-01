import React from 'react';
import { usePlayers } from './Players';
import { useDeck } from './Deck';
import OvenCard from './OvenCard';

function Round() {
    const { returnActiveNumberOfPlayers, returnPlayer, updateOrderPile, returnActiveColors, updateHand, returnHand, returnOrderPile } = usePlayers();
    const { deck, shuffle, drawTopCardFaceUp, removeOvenCard, showCard, removeIngredient, removeColorOrders} = useDeck(); 
    const hasRun = React.useRef(false);
    const [drawnCard, setDrawnCard] = React.useState(null);
    const [length, setLength] = React.useState(deck.length);
    const colorList = ['red', 'yellow', 'brown', 'purple', 'green'];
    const activeColors = returnActiveColors();

  
    const removeIngredientCards = () => {
        const numPlayers = returnActiveNumberOfPlayers();
        const ratios = {
            4: 1,
            3: 3,
            2: 5,
            1: 5,
        };

        colorList.forEach(color => {
            for (let i = 0; i < ratios[numPlayers]; i++) {
                removeIngredient(color);
            }
        })

    }

    const giveOutOrdersShuffled = () => {
        colorList.forEach(color => {
            const orderPile = removeColorOrders(color);

            for (let i = orderPile.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [orderPile[i], orderPile[j]] = [orderPile[j], orderPile[i]];
            }

            updateOrderPile(color, orderPile); 
        })
    }

    const createInitialHands = () => {
        const tempHands = {};

        activeColors.forEach(color => {
            const player = returnPlayer(color);
            tempHands[color] = [...player.hand];
        });

        // Add 6 cards per player
        for (let c = 0; c < 6; c++) {
            activeColors.forEach(color => {
                const { card } = drawTopCardFaceUp();
                tempHands[color].push(card);
            });
        }

        // Update all hands at once
        activeColors.forEach(color => {
            updateHand(color, tempHands[color]);
        });
    }

    const renderHand = (color) => {
        const hand = returnHand(color);
        return (
            <div className='flex w-full bg-blue-500 h-full relative w-full'>
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
    }

    const drawFromOrderPile = (color) => {
        const player = returnPlayer(color);

        if (player.orderPile.length === 0) return null;

        const newOrderPile = [...player.orderPile];
        const card = newOrderPile.pop();
        const newHand = [...player.hand, card];
        updateHand(color, newHand);
        updateOrderPile(color, newOrderPile );
        console.log('draw');
    }

    React.useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        
        removeIngredientCards();
        removeOvenCard();
        giveOutOrdersShuffled();
        shuffle();
        createInitialHands();
        
        // have each active player take a card from their orderPile
        activeColors.map((color) => {
            //drawFromOrderPile(color);
            //doesnt work because of fail to rerender?
        })
    },[])

    React.useEffect(() => {
        setLength(deck.length);
    }, [deck]);

    return(
        <>
            <div className='bg-red-100 h-full flex h-screen '> 
                    <div className='bg-red-500 w-1/2 flex flex-col justify-center'>
                        <div className='bg-purple-100'>{activeColors[0]}'s Hand:</div> 
                        <div className='bg-stone-900 w-full h-full'>{renderHand(activeColors[0])}</div>
                    </div>
                    <div className='bg-green-500 w-1/2 flex flex-wrap'>
                        {activeColors[0]}'s Order Pile:
                        {returnOrderPile(activeColors[0])}
                    </div>
            </div>
        </>
    );
}

export default Round;