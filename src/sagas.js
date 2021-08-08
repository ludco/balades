import { takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import {
  CREATE_WALK,
  GET_USER,
  GET_WALKS,
  LOAD_WALKS,
  REMOVE_WALK,
  GET_SETTINGS,
  API_ERRORED,
  ADD_WALK,
  UPDATE_WALK,
  EDIT_WALK,
  DELETE_WALK,
  LOAD_USER,
  LOAD_SETTINGS,
  CREATE_USER,
  FILTER_WALKS,
  RENDERFILTER_WALK,
  RENDERFILTER_WALKS,
} from './constants/action-types';
import {
  createWalk,
  deleteWalk,
  fetchSettings,
  fetchWalks,
  generateUserDocument,
  getUserDocument,
  updateWalk,
} from './firebaseRequests';

export default function* rootSaga() {
  yield all([
    takeEvery(GET_WALKS, getWalks),
    takeEvery(CREATE_WALK, addWalk),
    takeEvery(EDIT_WALK, editWalk),
    takeEvery(REMOVE_WALK, removeWalk),
    takeEvery(GET_USER, getCurrentUser),
    takeEvery(CREATE_USER, addUser),
    takeEvery(GET_SETTINGS, getSettings),
    takeLatest(FILTER_WALKS, filterWalks),
  ]);
}

/*------------------ WALKS -----------------*/
function* getWalks() {
  try {
    const payload = yield call(fetchWalks);
    yield put({ type: LOAD_WALKS, payload: payload });
  } catch (e) {
    console.error('Get Walks API error');
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* addWalk(action) {
  const { history } = action.payload;
  try {
    const payload = yield call(createWalk, action.payload);
    yield put({ type: ADD_WALK, payload: payload });
    history.push('/');
  } catch (e) {
    console.error('Add Walk API error');
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* editWalk(action) {
  const { history } = action.payload;
  try {
    const payload = yield call(updateWalk, action.payload);
    yield put({ type: UPDATE_WALK, payload: payload });
    history.push('/');
  } catch (e) {
    console.error('Edit Walk API error');
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* removeWalk(action) {
  const { walkToDelete } = action.payload;
  try {
    yield call(deleteWalk, action.payload);
    yield put({ type: DELETE_WALK, payload: walkToDelete });
    window.scrollTo(0, 0);
  } catch (e) {
    console.error('Remove Walk API error');
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* filterWalks(action) {
  const { walks, filters } = action.payload;
  try {
    const isShownBySector = (walk) => {
      const sectorFilters = filters.filter(
        (filter) => filter.group === 'sector'
      );

      if (!sectorFilters.length) return true;
      return sectorFilters.some((filter) => filter.fnc(walk));
    };

    const isShownByDifficulty = (walk) => {
      const diffFilters = filters.filter(
        (filter) => filter.group === 'difficulty'
      );
      if (!diffFilters.length) return true;
      return diffFilters.some((filter) => filter.fnc(walk));
    };
    const filteredWalks = walks.filter((walk) => {
      const showBySector = isShownBySector(walk);
      const showByDifficulty = isShownByDifficulty(walk);
      return showBySector && showByDifficulty;
    });
    yield put({ type: RENDERFILTER_WALKS, payload: filteredWalks });
  } catch (e) {
    console.error('Filter error');
  }
}

/*------------------ USER -----------------*/
function* addUser(user, additionalDatas) {
  try {
    const payload = yield call(generateUserDocument(user, additionalDatas));
    yield put({ type: LOAD_USER, payload: payload });
  } catch (e) {
    console.error('Add user API error');
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* getCurrentUser(action) {
  const { uid } = action.payload;
  try {
    const payload = yield call(getUserDocument, uid);
    yield put({ type: LOAD_USER, payload: payload });
  } catch (e) {
    console.error('Get user API error');
    yield put({ type: API_ERRORED, payload: e });
  }
}

/*------------------ SETTINGS -----------------*/
function* getSettings() {
  try {
    const payload = yield call(fetchSettings);
    yield put({ type: LOAD_SETTINGS, payload: payload });
  } catch (e) {
    console.error('Get Settings API error');
    yield put({ type: API_ERRORED, payload: e });
  }
}
