import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDeck, playGame } from '../../../utils/game';
import Button from '../../atoms/Button';
import Hand from '../../molecules/Hand';

const PlayGame = ({ setMode }: { setMode: (string) => void }) => {
  const [deck, setDeck] = useState([[], []]);
  const [game, setGame] = useState<any>({});
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');

  useEffect(() => {
    const run = async () => {
      const deck = await getDeck();
      setDeck(deck);
    };
    run();
  }, []);

  const handlePlay = async () => {
    const data = await playGame(player1, deck[0], player2, deck[1]);
    setGame(data);
  };

  return (
    <>
      {!game.id ? (
        <div>
          <div className='flex justify-center space-x-8'>
            <button
              className='p-2 border border-black rounded focus:outline-none'
              onClick={handlePlay}
            >
              Play Now
            </button>
          </div>
          <div className='flex justify-between'>
            <Hand
              deck={deck[0]}
              name='Player 1'
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <Hand
              deck={deck[1]}
              name='Player 2'
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className='flex'>
            <button
              className='m-auto p-2 border border-black bg-black text-white rounded focus:outline-none hover:scale-110 transform transition'
              onClick={() => setMode('before')}
            >
              Play Again
            </button>
          </div>
          <div className='space-y-4 text-center mt-8 text-2xl'>
            <p>Winner: {game.winner.name}</p>
            <p>Loser: {game.loser.name}</p>
            <p>Moves: {JSON.parse(game.moves).length}</p>
            <div>
              <Link to={`/game/${game.id}`}>
                <Button>
                  <p className='text-lg'>View Simulation</p>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayGame;
