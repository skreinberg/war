import * as shuffle from 'lodash.shuffle';

// I structured the suits and cards objects this way to allow a user to potentially edit the deck.
// This functionality is NOT implemented but I wanted to allow for it if this app was developed further
const suits: string[] = ['club', 'diamond', 'heart', 'spade'];

const cards: { name: string; value: number }[] = [
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
  { name: 'Jack', value: 11 },
  { name: 'Queen', value: 12 },
  { name: 'King', value: 13 },
  { name: 'Ace', value: 14 },
];

const makeDeck = (
  suits: string[],
  cards: { name: string; value: number }[],
  shuffleDeck = true
) => {
  const finalDeck = [];

  suits.forEach((suit) => {
    cards.forEach((card) => finalDeck.push({ ...card, suit: suit }));
  });

  if (shuffleDeck) {
    return shuffle(finalDeck);
  }

  return finalDeck;
};

export const deal = () => {
  const deck = makeDeck(suits, cards);

  const player1Deck = [];
  const player2Deck = [];

  deck.forEach((card, idx) => {
    if (idx % 2 === 0) {
      player1Deck.push(card);
    } else {
      player2Deck.push(card);
    }
  });

  return [player1Deck, player2Deck];
};
