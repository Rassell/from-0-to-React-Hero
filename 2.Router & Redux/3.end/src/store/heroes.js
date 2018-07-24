import { call, put, takeLatest } from 'redux-saga/effects';

export const SELECT_HERO = 'SELECT_HERO';
export const HERO_LIST_FETCH_REQUESTED = 'HERO_LIST_FETCH_REQUESTED';
export const HERO_LIST_FETCH_SUCCEEDED = 'HERO_LIST_FETCH_SUCCEEDED';
export const HERO_LIST_FETCH_FAILED = 'HERO_LIST_FETCH_FAILED';

/* INITIAL STATE
 ================================================================================================ */
const initialState = {
  heroSelected: null,
  heroList: [],
  isLoading: false,
  error: null,
};

/* REDUCER
 ================================================================================================ */
export default function reducer(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case SELECT_HERO:
      return { ...state, heroSelected: action.hero };

    case HERO_LIST_FETCH_SUCCEEDED:
      return { ...state, heroList: action.heroList };

    case HERO_LIST_FETCH_FAILED:
      return { ...state, error: action.message };

    default:
      return state;
  }
}

/* ACTIONS
 ================================================================================================ */
export function selectHero(hero) {
  return { type: SELECT_HERO, hero };
}
export function requestHero(heroName) {
  return { type: HERO_LIST_FETCH_REQUESTED, heroName };
}

/* SAGAS
 ================================================================================================ */

const fetchApi = heroName =>
  fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${heroName}&limit=30&apikey=[apikeyhere]`)
    .then(response => response.json())
    .then(({ data }) => data.results);

// worker Saga: will be fired on last HERO_LIST_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const heroList = yield call(fetchApi, action.heroName);
    yield put({ type: HERO_LIST_FETCH_SUCCEEDED, heroList });
  } catch (e) {
    yield put({ type: HERO_LIST_FETCH_FAILED, message: e.message });
  }
}

export function* heroSaga() {
  yield takeLatest(HERO_LIST_FETCH_REQUESTED, fetchUser);
}
