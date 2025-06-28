import React from 'react';
import { usePlayers } from './Players';
import { useDeck } from './Deck';

function Round() {
    const { returnActiveNumberOfPlayers, returnPlayer, updateOrderPile, returnActiveColors, updateHand } = usePlayers();
    const { deck, shuffle, drawTopCardFaceUp, clearDeck, removeOvenCard, addCardToTop, removeAllCardsOfType, showCard, removeIngredient, removeColorOrders} = useDeck(); 
    const hasRun = React.useRef(false);
    const [drawnCard, setDrawnCard] = React.useState(null);
    const [length, setLength] = React.useState(deck.length);
    const colorList = ['red', 'yellow', 'brown', 'purple', 'green']
  
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

    const giveOutOrders = () => {
        colorList.forEach(color => {
            const orderPile = removeColorOrders(color);
            updateOrderPile(color, orderPile); 
        })
    }

    const createInitialHands = () => {
        const activeColors = returnActiveColors();
        for (let c = 0; c < 6; c++) {
            activeColors.map(color => {
                const player = returnPlayer(color);
                const hand = [...player.hand, drawTopCardFaceUp()];
                console.log(hand);
                updateHand(color, hand);  
            })
        }
    }

    React.useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        
        removeIngredientCards();
        removeOvenCard();
        giveOutOrders();
        shuffle();
        createInitialHands();
    },[])

    React.useEffect(() => {
        setLength(deck.length);
    }, [deck]);

    return(
        <>
            {drawnCard && showCard(drawnCard)}
            <div>
                Active Players Amount:
                {returnActiveNumberOfPlayers()}
            </div>
            <div>
                Length:
                {length}
            </div>
            
        </>
    );
}

export default Round;