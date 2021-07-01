// Run through entire game
export const playGame = (deck1, deck2, moveList = []): [][] => {
  if (deck1.length > 0 && deck2.length > 0) {
    const decks = playHand(deck1, deck2);
    moveList.push(...decks[2]);
    return playGame(decks[0], decks[1], moveList);
  }

  return [deck1, deck2, moveList];
};

// Play specific hand, does handle infinite number of ties
const playHand = (deck1, deck2) => {
  const deck1Card = deck1[deck1.length - 1];
  const deck2Card = deck2[deck2.length - 1];
  deck1.pop();
  deck2.pop();

  let moveHistory: any[] = [];

  moveHistory.push({
    deck1: [...deck1],
    deck2: [...deck2],
    card1: [deck1Card],
    card2: [deck2Card],
  });

  if (deck1Card.value > deck2Card.value) {
    deck1 = [deck1Card, deck2Card, ...deck1];
  } else if (deck1Card.value === deck2Card.value) {
    const finishTie = playTie(
      [deck1Card],
      deck1,
      [deck2Card],
      deck2,
      moveHistory
    );

    deck1 = finishTie.deck1;
    deck2 = finishTie.deck2;
    moveHistory = finishTie.moveHistory;
  } else {
    deck2 = [deck2Card, deck1Card, ...deck2];
  }

  return [deck1, deck2, moveHistory];
};

// Helper for ties
// If you tie on the first draw, I consider the tie breaker another move and
// the moveHistory object reflects that decision
const playTie = (hand1, deck1, hand2, deck2, moveHistory) => {
  if (hand1.length + 2 > deck1.length) {
    return {
      deck1: [],
      deck2,
      moveHistory,
    };
  }

  if (hand2.length + 2 > deck2.length) {
    return {
      deck1,
      deck2: [],
      moveHistory,
    };
  }

  const deck1BurnCard = deck1[deck1.length - 1];
  const deck2BurnCard = deck2[deck2.length - 1];
  const deck1TieCard = deck1[deck1.length - 2];
  const deck2TieCard = deck2[deck2.length - 2];

  deck1.pop();
  deck1.pop();
  deck2.pop();
  deck2.pop();

  moveHistory.push({
    deck1: [...deck1],
    deck2: [...deck2],
    card1: [...hand1, deck1BurnCard, deck1TieCard],
    card2: [...hand2, deck2BurnCard, deck2TieCard],
  });

  if (deck1TieCard.value > deck2TieCard.value) {
    deck1 = [
      ...hand1,
      deck1BurnCard,
      deck1TieCard,
      ...hand2,
      deck2BurnCard,
      deck2TieCard,
      ...deck1,
    ];

    return {
      deck1,
      deck2,
      moveHistory,
    };
  } else if (deck1TieCard.value < deck2TieCard.value) {
    deck2 = [
      ...hand2,
      deck2BurnCard,
      deck2TieCard,
      ...hand1,
      deck1BurnCard,
      deck1TieCard,
      ...deck2,
    ];
    return {
      deck1,
      deck2,
      moveHistory,
    };
  } else {
    return playTie(
      [...hand1, deck1BurnCard, deck1TieCard],
      deck1,
      [...hand2, deck2BurnCard, deck2TieCard],
      deck2,
      moveHistory
    );
  }
};
