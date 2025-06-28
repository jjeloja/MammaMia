import { useState, createContext, useContext } from "react";

export const Players = createContext();
export const usePlayers = () => useContext(Players);

export function PlayersProvider({ children }) {
    const [players, setPlayers] = useState([
        { id: 1, name: 'Player 1', color: 'red', hand: [], deliveredOrders: 0, isPlaying: false, orderPile:[] },
        { id: 2, name: 'Player 2', color: 'yellow', hand: [], deliveredOrders: 0, isPlaying: false, orderPile:[] },
        { id: 3, name: 'Player 3', color: 'brown', hand: [], deliveredOrders: 0, isPlaying: false, orderPile:[] },
        { id: 4, name: 'Player 4', color: 'purple', hand: [], deliveredOrders: 0, isPlaying: false, orderPile:[] },
        { id: 5, name: 'Player 5', color: 'green', hand: [], deliveredOrders: 0, isPlaying: false, orderPile:[] }
    ]);

    const updatePlayer = (id, updates) => {
        setPlayers(prev => prev.map(player => player.id === id ? { ...player, ...updates } : player));
    }

    const playersAPI = {
        players,
        returnActiveNumberOfPlayers: () => {
            return players.reduce((count, player) => player.isPlaying ? count + 1 : count, 0);
        },
        switchPlayerActivity: (color) => {
            const player = players.find(player => player.color === color);
            if (!player) return;
            player.isPlaying ? updatePlayer(player.id, {isPlaying: false}) : updatePlayer(player.id, {isPlaying: true}); 
        },
        returnPlayer: (color) => {
            return players.find(player => player.color === color);
        },
        updateOrderPile: (color, newOrderPile) => {
            const player = players.find(player => player.color === color);
            updatePlayer(player.id, {orderPile: newOrderPile});
        },
        updateHand: (color, newHand) => {
            const player = players.find(player => player.color === color);
            updatePlayer(player.id, {hand: newHand});
        },
        returnActiveColors: () => {
            const colors = [];
            players.map(player => {
                if (player.isPlaying) colors.push(player.color);
            })
            return colors;
        }
    }

    return (
        <Players.Provider value={playersAPI}>
            {children}
        </Players.Provider>
    );
}
