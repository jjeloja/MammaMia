import { useState, createContext, useContext } from "react";
import OrderCard from "./OrderCard";

export const Players = createContext();
export const usePlayers = () => useContext(Players);

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", color: "red", hand: [], deliveredOrders: 0, isPlaying: false, orderPile: [] },
    { id: 2, name: "Player 2", color: "yellow", hand: [], deliveredOrders: 0, isPlaying: false, orderPile: [] },
    { id: 3, name: "Player 3", color: "brown", hand: [], deliveredOrders: 0, isPlaying: false, orderPile: [] },
    { id: 4, name: "Player 4", color: "purple", hand: [], deliveredOrders: 0, isPlaying: false, orderPile: [] },
    { id: 5, name: "Player 5", color: "green", hand: [], deliveredOrders: 0, isPlaying: false, orderPile: [] },
  ]);

  const updatePlayer = (id, updates) => {
    setPlayers(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const playersAPI = {
    players,
    returnActiveNumberOfPlayers: () => players.filter(p => p.isPlaying).length,
    switchPlayerActivity: (color) => {
      const player = players.find(p => p.color === color);
      if (!player) return;
      updatePlayer(player.id, { isPlaying: !player.isPlaying });
    },
    returnPlayer: (color) => players.find(p => p.color === color),
    updateOrderPile: (color, newOrderPile) => updatePlayer(players.find(p => p.color === color).id, { orderPile: newOrderPile, }),
    updateHand: (color, newHand) => updatePlayer(players.find(p => p.color === color).id, { hand: [...newHand], }),
    returnActiveColors: () => players.filter(p => p.isPlaying).map(p => p.color),
    returnHand: (color) => players.find(p => p.color === color)?.hand || [],
    returnOrderPile: (color) => players.find(p => p.color === color)?.orderPile || [],
    drawFromOrderPile: (color) => {
      const player = players.find(p => p.color === color);

      if (player.hand.length == 7) return;

      const newOrderPile = [...player.orderPile];
      const cardType = newOrderPile.pop();
      updatePlayer(player.id, {orderPile: newOrderPile});

      const card = <OrderCard color={cardType.color} type={cardType.type} extra={cardType.extra} isFaceUp={true} />
      const newHand = [...player.hand, card];
      updatePlayer(player.id, {hand: newHand});
    },
  };

  return (
    <Players.Provider value={playersAPI}>
      {children}
    </Players.Provider>
  );
}