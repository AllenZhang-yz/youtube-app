import {
  ADD_SEARCH_DATA_START,
  ADD_SEARCH_DATA_SUCCESS,
  ADD_SEARCH_DATA_FAILURE,
  ADD_SEARCH_TRENDING_START,
  ADD_SEARCH_TRENDING_SUCCESS,
  ADD_SEARCH_TRENDING_FAILURE,
  SEARCH_DATA_LOAD_MORE,
} from './dataActionTypes';
import { Action, Reducer } from 'redux';

interface IPagination {
  from: number;
  hasMore: boolean;
}

export interface IAction extends Action {
  type: string;
  payload: any[] | string | number;
}

export interface IDataState {
  searchResult: any[];
  showSearchResult: any[];
  isSearchFetching: boolean;
  searchErrorMsg: string | undefined;
  pagination: IPagination;
  trendingVideos: any[];
  isTrendingFetching: boolean;
  trendingErrorMsg: string | undefined;
}

const initialState: IDataState = {
  searchResult: [],
  showSearchResult: [],
  isSearchFetching: false,
  searchErrorMsg: undefined,
  pagination: {
    from: 0,
    hasMore: true,
  },
  trendingVideos: [],
  isTrendingFetching: false,
  trendingErrorMsg: undefined,
};

export const dataReducer: Reducer<IDataState, IAction> = (
  state = initialState,
  action: IAction
) => {
  switch (action.type) {
    case ADD_SEARCH_DATA_START:
      return {
        ...state,
        isSearchFetching: true,
      };
    case ADD_SEARCH_DATA_SUCCESS:
      const allData = action.payload as any[];
      const firstSlice = allData.slice(0, 10);
      return {
        ...state,
        searchResult: allData,
        showSearchResult: firstSlice,
        searchErrorMsg: undefined,
        pagination: {
          ...state.pagination,
          from: 10,
          hasMore: state.searchResult.length > state.showSearchResult.length,
        },
        isSearchFetching: false,
      };
    case ADD_SEARCH_DATA_FAILURE:
      return {
        ...state,
        isSearchFetching: false,
        searchErrorMsg: action.payload as string,
      };
    case SEARCH_DATA_LOAD_MORE:
      const from = state.pagination.from;
      const fullData = state.searchResult;
      let dataSlice = [];
      if (state.pagination.hasMore) {
        dataSlice = fullData.slice(from, from + 10);
      }
      const newShowSearchResult = [...state.showSearchResult].concat(dataSlice);
      return {
        ...state,
        showSearchResult: newShowSearchResult,
        pagination: {
          ...state.pagination,
          from: from + 10,
          hasMore: state.searchResult.length > state.showSearchResult.length,
        },
      };
    case ADD_SEARCH_TRENDING_START:
      return {
        ...state,
        isTrendingFetching: true,
      };
    case ADD_SEARCH_TRENDING_SUCCESS:
      return {
        ...state,
        trendingVideos: action.payload as any[],
        isTrendingFetching: false,
      };
    case ADD_SEARCH_TRENDING_FAILURE:
      return {
        ...state,
        isTrendingFetching: false,
        trendingErrorMsg: action.payload as string,
      };
    default:
      return state;
  }
};
