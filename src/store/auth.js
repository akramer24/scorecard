const ATTEMPTED_LOAD_USER = 'ATTEMPTED_LOAD_USER';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
const SHOW_FORM_ERROR = 'SHOW_FORM_ERROR';
const REMOVE_FORM_ERROR = 'REMOVE_FORM_ERROR';

const defaultAuth = {
  error: null,
  user: null,
  attemptedLoadUser: false
};

export const attemptedLoadUser = () => ({ type: ATTEMPTED_LOAD_USER });
export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });
export const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER });
export const showFormError = message => ({ type: SHOW_FORM_ERROR, message });
export const removeFormError = () => ({ type: REMOVE_FORM_ERROR });

export default function (state = defaultAuth, action) {
  switch (action.type) {
    case ATTEMPTED_LOAD_USER:
      return { ...state, attemptedLoadUser: true }
    case SET_CURRENT_USER:
      return { ...state, user: action.user };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    case SHOW_FORM_ERROR:
      return { ...state, error: action.message };
    case REMOVE_FORM_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}