import {
  LOAD_WALKS,
  ADD_WALK,
  UPDATE_WALK,
  LOAD_USER,
  LOAD_SETTINGS,
} from './constants/action-types';

const initialState = {
  user: null,
  walks: [],
  settings: [],
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
  if (action.type === UPDATE_WALK) {
    const index = state.walks.findIndex(
      (walk) => walk.id === action.payload.id
    );
    state.walks[index] = action.payload;
    return {
      ...state,
      walks: state.walks,
      loading: false,
    };
  }
  if (action.type === LOAD_SETTINGS) {
    return {
      ...state,
      settings: action.payload,
      loading: false,
    };
  }

  return state;
}

export default rootReducer;
