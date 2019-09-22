const GET_LEAGUES = 'GET_LEAGUES';
const GET_LEAGUE = 'GET_LEAGUE';

const defaultState = {};

export const getLeagues = leagues => ({ type: GET_LEAGUES, leagues });
export const getLeague = league => ({ type: GET_LEAGUE, league });

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_LEAGUE:
      return { ...state, [action.league.id]: action.league }
    default:
      return state;
  }
}