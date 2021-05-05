import { createAction } from 'redux-actions';
import {
  CREATE_USER,
  CREATE_WALK,
  EDIT_WALK,
  GET_SETTINGS,
  GET_USER,
  GET_WALKS,
  LOGOUT_USER,
  REMOVE_WALK,
  SET_WARNING_TOAST,
} from './constants/action-types';

export const doCreateUser = createAction(CREATE_USER);
export const doGetUser = createAction(GET_USER);
export const doLogoutUser = createAction(LOGOUT_USER);
export const doGetWalks = createAction(GET_WALKS);
export const doCreateWalk = createAction(CREATE_WALK);
export const doEditWalk = createAction(EDIT_WALK);
export const doRemoveWalk = createAction(REMOVE_WALK);
export const doGetSettings = createAction(GET_SETTINGS);
export const showWarningToast = createAction(SET_WARNING_TOAST);
