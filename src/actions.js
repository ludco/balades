import {
  LOAD_WALKS,
  ADD_WALK,
  LOAD_USER,
  UPDATE_WALK,
  LOAD_SETTINGS,
} from './constants/action-types';
import { auth } from './firebase.config';
import {
  fetchWalks,
  generateUserDocument,
  getUserDocument,
  createWalk,
  updateWalk,
  fetchSettings,
} from './firebaseRequests';

/* ------------------  WALKS  ---------------*/
export function getWalks() {
  return async function (dispatch) {
    return fetchWalks().then((res) => {
      dispatch({ type: LOAD_WALKS, payload: res });
    });
  };
}

export function addWalk(walkToAdd, imageData, history) {
  return async function (dispatch) {
    return createWalk(walkToAdd, imageData).then((res) => {
      dispatch({ type: ADD_WALK, payload: res });
      history.push('/');
    });
  };
}

export function editWalk(walkToUpdate, imageData, history) {
  return async function (dispatch) {
    return updateWalk(walkToUpdate, imageData).then((res) => {
      dispatch({ type: UPDATE_WALK, payload: res });
      if (history) history.push('/');
    });
  };
}

/* ------------------  USERS  ---------------*/
export function addUser(user, additionalDatas) {
  return function (dispatch) {
    generateUserDocument(user, additionalDatas).then((res) =>
      dispatch({ type: LOAD_USER, payload: res })
    );
  };
}

export function getCurrentUser() {
  return function (dispatch) {
    return auth.onAuthStateChanged((userAuth) => {
      getUserDocument(userAuth.uid).then((res) =>
        dispatch({ type: LOAD_USER, payload: res })
      );
    });
  };
}
/* ------------------  SETTINGS  ---------------*/
export function getSettings() {
  return async function (dispatch) {
    return fetchSettings().then((res) => {
      dispatch({ type: LOAD_SETTINGS, payload: res });
    });
  };
}
