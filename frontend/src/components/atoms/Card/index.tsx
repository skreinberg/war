import React, { Fragment } from 'react';
import heart from '../../../assets/heart.svg';
import club from '../../../assets/club.svg';
import diamond from '../../../assets/diamond.svg';
import spade from '../../../assets/spade.svg';

const suits: any = {
  heart: heart,
  club: club,
  diamond: diamond,
  spade: spade,
};

type CardProps = {
  suit?: string;
  name?: string;
  filler?: boolean;
  burn?: boolean;
};

const Card = ({ suit, name, filler = false, burn = false }: CardProps) => {
  return (
    <div
      className={`relative h-32 w-24 my-4 ${
        filler ? '' : 'border rounded border-black'
      } ${burn ? 'bg-black' : ''}`}
    >
      {filler ? null : (
        <Fragment>
          {burn ? null : (
            <img
              className='absolute left-2 top-2 w-8 h-8'
              src={suits[suit as string]}
              alt={`${suit}`}
            />
          )}

          <p className='absolute text-lg left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2	'>
            {name}
          </p>
        </Fragment>
      )}
    </div>
  );
};

export default Card;
