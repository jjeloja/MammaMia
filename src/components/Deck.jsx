import { useState, createContext, useContext, useRef, cloneElement } from "react";
import { BasicCard } from "./BasicCard";
import IngredientCard from "./IngredientCard";
import OrderCard from "./OrderCard";
import OvenCard from "./OvenCard";

export const Deck = createContext();
export const useDeck = () => useContext(Deck);

function createInitialDeck() {
    const cards = [];

    // adds 1 oven card
    cards.push({type: 'oven', card: <OvenCard />});

    // adds 13 of each ingredient type
    Object.keys(BasicCard).map((color) => {
        for (let i = 0; i < 13; i++) {
            cards.push({type: 'ingredient', card: <IngredientCard color={color}/> });
        }
    })

    // adds 8 order cards of each ingredient type
    const recipeList = ['normale1', 'normale2', 'bombastica', 'monotoni', 'minimale'];
    const ingredientList = Object.keys(BasicCard)
    Object.keys(BasicCard).map((color) => {
        const extraIngredientsList = Object.keys(BasicCard).filter(key => key !== color);            
        for (let j = 0; j < 4; j++) {
            cards.push({type: 'order', card: <OrderCard color={color} type='normale1' extra={extraIngredientsList[j]}/>})
        }
        cards.push({type: 'order', card: <OrderCard color={color} type={recipeList[1]} /> })
        cards.push({type: 'order', card: <OrderCard color={color} type={recipeList[2]} /> })
        cards.push({type: 'order', card: <OrderCard color={color} type={recipeList[3]} /> })
        cards.push({type: 'order', card: <OrderCard color={color} type={recipeList[4]} /> })
    })

    return cards;
}

export function DeckProvider({ children }) {
    const [deck, setDeck] = useState(createInitialDeck());
    const deckRef = useRef(deck);

    const updateDeck= (newDeck) => {
        deckRef.current = newDeck;
        setDeck(newDeck);
    };

    const deckAPI = {
        deck, 
        shuffle: () => {
            const newDeck = deckRef.current;
            let currentIndex = newDeck.length;
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                
                [newDeck[currentIndex], newDeck[randomIndex]] = [newDeck[randomIndex], newDeck[currentIndex]];
            }
            updateDeck(newDeck);
        },
        drawTopCardFaceUp: () => {
            const newDeck = deckRef.current;
            const drawn = newDeck.pop();
            updateDeck(newDeck);
            return cloneElement(drawn.card, { isFaceUp: true });
        },
        clearDeck: () => {
            const newDeck = [];
            updateDeck(newDeck);
        },
        removeOvenCard: () => {
            const newDeck = deckRef.current.filter(card => card.type != "oven");
            updateDeck(newDeck);
        },
        addCardToTop: (newType, newCard) => {
            const newDeck = deckRef.current;
            newDeck.push({type: newType, card: newCard});
            updateDeck(newDeck);
        },
        removeAllCardsOfType: (typeToRemove) => {
            const newDeck = deckRef.current.filter(card => card.type !== typeToRemove);
            updateDeck(newDeck);
        },
    }

    return(
        <Deck value={deckAPI}>
            {children}
        </Deck>
    );
}