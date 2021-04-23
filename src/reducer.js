import {
  LOAD_WALKS,
  ADD_WALK,
  UPDATE_WALK,
  LOAD_USER,
  LOAD_SETTINGS,
  SET_LOADING_TRUE,
  SET_WARNING_TOAST,
} from './constants/action-types';

const initialState = {
  user: null,
  walks: [],
  settings: [],
  loading: true,
  toast: { status: false, type: '', message: '' },
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
      toast: {
        status: true,
        type: 'success',
        message: 'Balade ajoutée avec succés !',
      },
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
      toast: {
        status: true,
        type: 'success',
        message: 'Balade modifiée avec succés !',
      },
    };
  }
  if (action.type === LOAD_SETTINGS) {
    return {
      ...state,
      settings: action.payload,
      loading: false,
    };
  }
  if (action.type === SET_LOADING_TRUE) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === SET_WARNING_TOAST) {
    return {
      ...state,
      taost: {
        status: true,
        type: 'warning',
        message: 'Un problème est survenu. Veuillez ré-essayer.',
      },
    };
  }

  return state;
}

export default rootReducer;
