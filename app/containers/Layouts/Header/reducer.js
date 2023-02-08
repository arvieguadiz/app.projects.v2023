/*
 *
 * Header reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_THEME,
} from './constants';

export const initialState = {
  theme: 'dark',
};

/* eslint-disable default-case, no-param-reassign */
const headerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_THEME:
        draft.theme = action.payload;
        break;
    }
  });

export default headerReducer;
