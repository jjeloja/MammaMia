import React from 'react';
import { usePlayers } from './Players';
import backgroundIMG from '../assets/download.jpg';

function Start({onStart}) {
    const { switchPlayerActivity, returnActiveNumberOfPlayers, returnPlayer } = usePlayers();

    return (
        <div className='flex place-content-between h-screen gap-5 bg-contain bg-no-repeat bg-full bg-black ' style={{backgroundImage: `url(${backgroundIMG})`}}>
            <div className='w-1/2'>
            </div>
            <div className='flex justify-center items-center flex-col text-white w-1/2 '>
                <div>Choose which players are active:</div>
                <div className='w-full mt-2 mb-7 flex justify-center text-black'> 
                    <button onClick={() => switchPlayerActivity('red')} className='p-3 m-2 w-30 bg-red-500 rounded-3xl hover:bg-red-400'>Red is {returnPlayer('red').isPlaying ? 'playing' : 'not playing'}</button>
                    <button onClick={() => switchPlayerActivity('yellow')} className='p-3 m-2 w-30 bg-yellow-500 rounded-3xl hover:bg-yellow-200'>Yellow is {returnPlayer('yellow').isPlaying ? 'playing' : 'not playing'}</button>
                    <button onClick={() => switchPlayerActivity('brown')} className='p-3 m-2 w-30 bg-amber-900 rounded-3xl hover:bg-amber-700'>Brown is {returnPlayer('brown').isPlaying ? 'playing' : 'not playing'}</button>
                    <button onClick={() => switchPlayerActivity('purple')} className='p-3 m-2 w-30 bg-purple-500 rounded-3xl hover:bg-purple-400'>Purple is {returnPlayer('purple').isPlaying ? 'playing' : 'not playing'}</button>
                    <button onClick={() => switchPlayerActivity('green')} className='p-3 m-2 w-30 bg-green-500 rounded-3xl hover:bg-green-300'>Green is {returnPlayer('green').isPlaying ? 'playing' : 'not playing'}</button>
                </div>
                <div className='w-full flex justify-center mb-7'> 
                    Active Players: 
                    {returnActiveNumberOfPlayers()}
                </div>
                <div>
                    <button className='p-3 w-50 rounded-3xl bg-gray-600 hover:bg-gray-200 hover:text-black' onClick={() => {if (returnActiveNumberOfPlayers()) onStart();} }>
                        {returnActiveNumberOfPlayers() > 0 ? 'Start' : 'Pick at least one player'}
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default Start;

