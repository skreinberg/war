import axios from 'axios';

export const getGame = async (id: string) => {
  const game = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/game`, {
    params: {
      id,
    },
  });

  return game.data;
};

export const getDeck = async () => {
  const deck = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/game/deal`
  );

  return deck.data;
};

export const playGame = async (
  player1: string,
  deck1: any,
  player2: string,
  deck2: any
) => {
  const deck = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/game/play`,
    {
      player1,
      deck1,
      player2,
      deck2,
    }
  );

  return deck.data;
};
