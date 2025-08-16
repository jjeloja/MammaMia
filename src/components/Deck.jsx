import React, { useState, createContext, useContext, useRef, useMemo } from "react";
import { BasicCard } from "./BasicCard";
import IngredientCard from "./IngredientCard";
import OrderCard from "./OrderCard";
import OvenCard from "./OvenCard";

export const Deck = createContext();
export const useDeck = () => useContext(Deck);

function createInitialDeck() {
  const cards = [];
  cards.push({ type: "oven", card: <OvenCard /> });

  Object.keys(BasicCard).forEach(color => {
    for (let i = 0; i < 13; i++) {
      cards.push({ type: "ingredient", card: <IngredientCard color={color} /> });
    }
  });

  const recipeList = ["normale1", "normale2", "bombastica", "monotoni", "minimale"];
  Object.keys(BasicCard).forEach(color => {
    const others = Object.keys(BasicCard).filter(k => k !== color);
    for (let j = 0; j < 4; j++) {
      cards.push({ type: "order", card: <OrderCard color={color} type="normale1" extra={others[j]} /> });
    }
    recipeList.slice(1).forEach(type => {
      cards.push({ type: "order", card: <OrderCard color={color} type={type} /> });
    });
  });

  return cards;
}

export function DeckProvider({ children }) {
  const [deck, setDeck] = useState(createInitialDeck());
  const deckRef = useRef(deck);

  const updateDeck = (newDeck) => {
    deckRef.current = newDeck;
    setDeck([...newDeck]); 
  };

  const deckAPI = useMemo(() => ({
    deck,
    shuffle: () => {
      const shuffled = [...deckRef.current];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      updateDeck(shuffled);
    },
    drawTopCardFaceUp: () => {
      const copy = [...deckRef.current];
      const drawn = copy.pop();
      updateDeck(copy);
      return { ...drawn, card: React.cloneElement(drawn.card, { isFaceUp: true }) };
    },
    clearDeck: () => updateDeck([]),
    removeOvenCard: () => updateDeck(deckRef.current.filter(c => c.type !== "oven")),
    addCardToTop: (type, card) => updateDeck([...deckRef.current, { type, card }]),
    removeAllCardsOfType: (type) => updateDeck(deckRef.current.filter(c => c.type !== type)),
    showCard: (cardObj) => cardObj.card,
    removeIngredient: (color) => {
      const i = deckRef.current.findIndex(c => c.type === "ingredient" && c.card.props.color === color);
      if (i >= 0) updateDeck([...deckRef.current.slice(0, i), ...deckRef.current.slice(i + 1)]);
    },
    removeColorOrders: (color) => {
      const toReturn = deckRef.current
        .filter(c => c.type === "order" && c.card.props.color === color)
        .map(c => ({
          color: c.card.props.color,
          type: c.card.props.type,
          extra: c.card.props.extra ?? null
        }));

      updateDeck(deckRef.current.filter(c => !(c.type === "order" && c.card.props.color === color)));
      return toReturn;
    }
  }), [deck]);

  return <Deck.Provider value={deckAPI}>{children}</Deck.Provider>;
}