import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '.';

test('renders button', () => {
  const { container } = render(<Card suit='club' name='10' />);

  const cardNumber = container.querySelector('div > p');
  expect(cardNumber?.textContent).toEqual('10');
});
