import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Hand from '../../components/molecules/Hand';
import Navbar from '../../components/organisms/Navbar';
import { getGame } from '../../utils/game';

const Game = () => {
  const [game, setGame] = useState<any>({});
  const [move, setMove] = useState<any>(1);

  const { id }: { id: string } = useParams();

  useEffect(() => {
    const run = async () => {
      const game = await getGame(id);
      setGame(game);
    };

    run();
  });

  const parsedMoves = game.moves ? JSON.parse(game.moves) : undefined;

  return (
    <div className='w-4/5 mx-auto pt-12'>
      <Navbar />
      <div>
        <p className='text-2xl'>Game ID: {game.id}</p>
        <p className='text-xl'>Game Winner: {game.winner?.name}</p>
        <p className='text-xl'>Game Loser: {game.loser?.name}</p>
        <p className='text-xl'>
          Moves: {game.moves && JSON.parse(game.moves).length}
        </p>
        <div className='flex space-x-8 mt-4'>
          <Button
            className='border p-4 border-black focus:outline-none'
            onClick={() => setMove(move + 1)}
          >
            <p>Advance</p>
          </Button>
          <Button
            className='border p-4 border-black focus:outline-none'
            onClick={() => setMove(move - 1)}
          >
            <p>Go Back</p>
          </Button>
          <p className='my-auto'>Move: {move}</p>
        </div>
      </div>
      {parsedMoves && (
        <div>
          <div className='flex justify-between'>
            <div className='w-5/12 flex justify-center space-x-4'>
              {parsedMoves[move - 1].card1.map((card, idx) => (
                <Card
                  suit={card.suit}
                  name={card.name}
                  key={idx}
                  burn={
                    parsedMoves[move - 1].card1.length > 0 &&
                    idx !== parsedMoves[move - 1].card1.length - 1 &&
                    true
                  }
                />
              ))}
            </div>
            <div className='w-5/12 flex justify-center space-x-4'>
              {parsedMoves[move - 1].card2.map((card, idx) => (
                <Card
                  suit={card.suit}
                  name={card.name}
                  key={idx}
                  burn={
                    parsedMoves[move - 1].card2.length > 0 &&
                    idx !== parsedMoves[move - 1].card2.length - 1 &&
                    true
                  }
                />
              ))}
            </div>
          </div>
          <div className='flex justify-between'>
            <Hand
              deck={parsedMoves[move - 1].deck1}
              value={game.winner?.name}
            />
            <Hand deck={parsedMoves[move - 1].deck2} value={game.loser?.name} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
