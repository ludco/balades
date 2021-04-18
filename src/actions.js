import { LOAD_WALKS, ADD_WALK, LOAD_USER } from './constants/action-types';
import { auth } from './firebase.config';
import {
  fetchWalks,
  generateUserDocument,
  getUserDocument,
  createWalk,
} from './firebaseRequests';

export function getWalks() {
  return async function (dispatch) {
    return fetchWalks().then((res) => {
      dispatch({ type: LOAD_WALKS, payload: res });
    });
  };
}

export function addWalk(walkToAdd, imageUrl, history) {
  return async function (dispatch) {
    return createWalk(walkToAdd, imageUrl).then((res) => {
      dispatch({ type: ADD_WALK, payload: res });
      history.push('/');
    });
  };
}

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
