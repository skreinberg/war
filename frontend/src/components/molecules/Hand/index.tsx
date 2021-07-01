import React, { Fragment } from 'react';
import Card from '../../atoms/Card';

const Hand = ({ deck = [], value, onChange }: any) => {
  return (
    <div className='w-5/12'>
      <div className='flex'>
        {onChange ? (
          <Fragment>
            <input
              className='text-2xl w-1/4 focus:outline-none'
              value={value}
              onChange={onChange}
            />
            <p className='ml-8 mt-auto'>Editable</p>
          </Fragment>
        ) : (
          <p className='text-2xl'>{value}</p>
        )}
      </div>
      <div className='flex flex-wrap justify-between'>
        {deck.map((card: any, idx: number) => (
          <Card suit={card.suit} name={card.name} key={idx} />
        ))}
        {deck.length > 0 &&
          [...Array((6 % deck.length) - 1)].map((_, idx: number) => (
            <Card filler={true} />
          ))}
      </div>
    </div>
  );
};

export default Hand;
