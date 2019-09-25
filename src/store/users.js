const GET_USER = 'GET_USER';

const defaultUser = {};

export const getUser = user => ({ type: GET_USER, user });

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, [action.user.uid]: action.user }
    default:
      return state;
  }
}