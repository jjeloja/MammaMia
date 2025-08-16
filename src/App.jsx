import Start from './components/Start';
import { DeckProvider } from './components/Deck';
import { PlayersProvider } from './components/Players';
import React from 'react';
import Round from './components/Round';

function App() {  
  const [gameStarted, setGameStarted] = React.useState(false);

  return (
    <DeckProvider>
      <PlayersProvider>
        {!gameStarted ? (
          <Start onStart={() => setGameStarted(true)} />
        ) : (
          <>
          <Round />
            
            {/** <div className='h-screen w-screen bg-red-500 flex flex-col relative'> */}
              {/**  <div className='bg-green-500 absolute top-0 left-1/2 -translate-x-1/2 h-1/3 w-2/5'>Supply</div> */}

            {/**  5 PLAYERS
              <div className='h-1/2 bg-neutral-100 w-full flex'>
                <div className='bg-blue-500 w-1/2'>1P</div>
                <div className='bg-purple-500 w-1/2'>2P</div>
              </div>

              <div className='bg-neutral-500 h-1/2 w-full flex'>
                <div className='bg-yellow-500 w-1/3'>3P</div>
                <div className='bg-rose-500 w-1/3'>4P</div>
                <div className='bg-stone-500 w-1/3'>5P</div>
              </div>
            */}

            {/** 4 PLAYERS
              <div className='h-1/2 bg-neutral-100 w-full flex'>
                <div className='bg-blue-500 w-1/2'>1P</div>
                <div className='bg-purple-500 w-1/2'>2P</div>
              </div>

              <div className='h-1/2 bg-blue-100 w-full flex'>
                <div className='bg-yellow-500 w-1/2'>3P</div>
                <div className='bg-rose-500 w-1/2'>4P</div>
              </div>
            */}

            {/** 3 PLAYERS
              <div className='h-full bg-blue-100 w-full flex'>
                <div className='bg-blue-500 w-1/3'>1P</div>
                <div className='bg-purple-500 w-1/3'>2P</div>
                <div className='bg-yellow-500 w-1/3'>3P</div>
              </div>
            */}

            {/** 2 PLAYERS
              <div className='h-full bg-blue-100 w-full flex'>
                <div className='bg-blue-500 w-1/2'>1P</div>
                <div className='bg-purple-500 w-1/2'>2P</div>
              </div>
            */}

            {/** 1 PLAYER
              <div className='h-full bg-blue-100 w-full flex'>
                <div className='bg-blue-500 w-full'>1P</div>            
              </div>
             */}
          {/** </div> */}  
        </>)}
      </PlayersProvider>
    </DeckProvider>
  );
}

export default App;