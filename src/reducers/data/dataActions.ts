import {
  ADD_SEARCH_DATA_START,
  ADD_SEARCH_DATA_SUCCESS,
  ADD_SEARCH_DATA_FAILURE,
  ADD_SEARCH_TRENDING_START,
  ADD_SEARCH_TRENDING_SUCCESS,
  ADD_SEARCH_TRENDING_FAILURE,
  SEARCH_DATA_LOAD_MORE,
} from './dataActionTypes';

export const fetchSearchResultStart = (searchValue: string) => ({
  type: ADD_SEARCH_DATA_START,
  payload: searchValue,
});

export const fetchSearchResultSuccess = (results: any[]) => ({
  type: ADD_SEARCH_DATA_SUCCESS,
  payload: results,
});

export const fetchSearchResultFailure = (errMsg: string) => ({
  type: ADD_SEARCH_DATA_FAILURE,
  payload: errMsg,
});

export const searchResultLoadMore = () => ({
  type: SEARCH_DATA_LOAD_MORE,
});

export const fetchTrendingStart = (name: string) => ({
  type: ADD_SEARCH_TRENDING_START,
  payload: name,
});

export const fetchTrendingSuccess = (results: any[]) => ({
  type: ADD_SEARCH_TRENDING_SUCCESS,
  payload: results,
});

export const fetchTrendingFailure = (errMsg: string) => ({
  type: ADD_SEARCH_TRENDING_FAILURE,
  payload: errMsg,
});
