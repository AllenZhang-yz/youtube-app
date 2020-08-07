type ActionType = 'CHANGE_THEME';

interface IAction {
  type: ActionType;
  payload: boolean;
}

const initialState = false;

export const themeReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return action.payload;
    default:
      return state;
  }
};
