import { LOAD_WALKS, ADD_WALK, LOAD_USER } from './constants/action-types';

const initialState = {
  user: null,
  walks: [],
  loading: true,
};

function rootReducer(state = initialState, action) {
  if (action.type === LOAD_USER) {
    return {
      ...state,
      user: action.payload,
      loading: false,
    };
  }
  if (action.type === LOAD_WALKS) {
    return {
      ...state,
      walks: state.walks.concat(action.payload),
      loading: false,
    };
  }
  if (action.type === ADD_WALK) {
    return {
      ...state,
      walks: state.walks.concat(action.payload),
      loading: false,
    };
  }

  return state;
}

export default rootReducer;
