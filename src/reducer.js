import { LOAD_WALKS, ADD_WALK, LOAD_USER } from './constants/action-types';

const initialState = {
  user: null,
  walks: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === LOAD_USER) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === LOAD_WALKS) {
    return {
      ...state,
      walks: state.walks.concat(action.payload),
    };
  }
  if (action.type === ADD_WALK) {
    return { ...state, walks: state.walks.concat(action.payload) };
  }

  return state;
}

export default rootReducer;
