// methods to add: shuffle, remove a card/draw (both on top or of a specific card), add a card, turn over all cards, turn over specific card
// 1 oven card, 13 of each ingredient, 8 order cards (5 normale, 1 bombastica, 1 monotoni, 1 minimale)
import { useState } from "react";
import { BasicCard } from "./BasicCard";
import IngredientCard from "./IngredientCard";
import OrderCard from "./OrderCard";
import OvenCard from "./OvenCard";

function Deck() {
    const [deck, setDeck] = useState(initialDeck());

    function initialDeck() {
        const cards = [];

        // adds 1 oven card
        cards.push({type: 'oven', card: <OvenCard />});

        // adds 13 of each ingredient type
        Object.keys(BasicCard).map((color) => {
            for (let i = 0; i < 13; i++) {
                cards.push({type: 'ingredient', card: <IngredientCard color={color}/> });
            }
        })

        const recipeList = ['normale', 'bombastica', 'monotoni', 'minimale'];
        const ingredientList = Object.keys(BasicCard)

        Object.keys(BasicCard).map((color) => {
            const extraIngredientsList = Object.keys(BasicCard).filter(key => key !== color);            
            for (let j = 0; j < 4; j++) {
                cards.push({type: 'order', card: <OrderCard color={color} type='normale1' extra={extraIngredientsList[j]}/>})
            }
            cards.push({type: 'order', card: <OrderCard color={color} type='normale2' /> })
            cards.push({type: 'order', card: <OrderCard color={color} type='bombastica' /> })
            cards.push({type: 'order', card: <OrderCard color={color} type='monotni' /> })
            cards.push({type: 'order', card: <OrderCard color={color} type='minimale' /> })
        })

        return cards;
    }

    return (
        <>
            {deck.length}
        </>
    );
};

export default Deck;