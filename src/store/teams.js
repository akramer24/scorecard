const GET_TEAMS = 'GET_TEAMS';
const GET_TEAM = 'GET_TEAM';

const defaultState = {};

export const getTeams = teams => ({ type: GET_TEAMS, teams });
export const getTeam = team => ({ type: GET_TEAM, team });

const handleGetTeams = teams => {
  const state = {};
  teams.forEach(team => {
    state[team.id] = team;
  });
  return state;
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return { ...state, ...handleGetTeams(action.teams) }
    case GET_TEAM:
      return { ...state, [action.team.id]: action.team }
    default:
      return state;
  }
}