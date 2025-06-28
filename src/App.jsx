import Start from './components/Start';
import { DeckProvider } from './components/Deck';
import { PlayersProvider } from './components/Players';
import React from 'react';
import Round from './components/Round';

function App() {  
  const [gameStarted, setGameStarted] = React.useState(false);

  return (
    <>
      <DeckProvider>
        <PlayersProvider>
          {!gameStarted ? (
          <Start onStart={() => setGameStarted(true)} />
        ) : <Round />}
        </PlayersProvider>
      </DeckProvider>
    </>
  );
}

export default App;