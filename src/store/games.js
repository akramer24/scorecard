const GET_GAMES = 'GET_GAMES';
const GET_GAME = 'GET_GAME';

const defaultState = {};

export const getGames = games => ({ type: GET_GAMES, games });
export const getGame = game => ({ type: GET_GAME, game });

const handleGetGames = games => {
  const state = {};
  games.forEach(game => {
    state[game.id] = game;
  });
  return state;
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, ...handleGetGames(action.games) }
    case GET_GAME:
      return { ...state, [action.game.id]: action.game }
    default:
      return state;
  }
}