import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '.';

test('renders button', () => {
  const { container } = render(
    <Button>
      <p>Test</p>
    </Button>
  );

  const buttonText = container.querySelector('button > p');
  expect(buttonText?.textContent).toEqual('Test');
});
