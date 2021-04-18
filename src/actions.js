import { LOAD_WALKS, ADD_WALK, LOAD_USER } from './constants/action-types';
import { auth, db } from './firebase.config';
import {
  fetchWalks,
  generateUserDocument,
  getUserDocument,
} from './firebaseRequests';

export function addWalk(payload) {
  return { type: ADD_WALK, payload };
}
export function getWalks() {
  return async function (dispatch) {
    return fetchWalks().then((res) => {
      dispatch({ type: LOAD_WALKS, payload: res });
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
