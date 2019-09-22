const GET_TEAMS = 'GET_TEAMS';
const GET_TEAM = 'GET_TEAM';

const defaultState = {};

export const getTeams = teams => ({ type: GET_TEAMS, teams });
export const getTeam = team => ({ type: GET_TEAM, team });

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_TEAM:
      return { ...state, [action.team.id]: action.team }
    default:
      return state;
  }
}