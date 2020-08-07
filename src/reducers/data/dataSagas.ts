import {
  ADD_SEARCH_DATA_START,
  ADD_SEARCH_TRENDING_START,
} from './dataActionTypes';
import { takeEvery, put, all, call } from 'redux-saga/effects';
import { Keyboard } from 'react-native';
import axios from 'axios';
import { IAction } from './dataReducer';
import {
  fetchSearchResultSuccess,
  fetchSearchResultFailure,
  fetchTrendingSuccess,
  fetchTrendingFailure,
} from './dataActions';
import { fetchUrl } from '../../utils/fetchUrl';

function* fetchSearchResultAsync(action: IAction) {
  const searchValue = action.payload as string;
  yield Keyboard.dismiss();
  try {
    const url = yield call(fetchUrl, 100, searchValue);
    const response = yield call(axios.get, url);
    yield put(fetchSearchResultSuccess(response.data.items as any[]));
  } catch (err) {
    yield put(fetchSearchResultFailure(err.message));
  }
  yield;
}

function* fetchTrendingAsync(action: IAction) {
  const name = action.payload as string;
  try {
    const url = yield call(fetchUrl, 10, name);
    const response = yield call(axios.get, url);
    yield put(fetchTrendingSuccess(response.data.items as any[]));
  } catch (err) {
    yield put(fetchTrendingFailure(err.message));
  }
}

function* fetchSearchResultStart() {
  yield takeEvery(ADD_SEARCH_DATA_START, fetchSearchResultAsync);
}

function* fetchTrendingStart() {
  yield takeEvery(ADD_SEARCH_TRENDING_START, fetchTrendingAsync);
}

export function* dataSagas() {
  yield all([call(fetchSearchResultStart), call(fetchTrendingStart)]);
}
