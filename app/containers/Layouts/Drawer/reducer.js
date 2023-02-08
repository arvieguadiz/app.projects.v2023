/*
 *
 * Drawer reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_DRAWER_STATE,
  CHANGE_ACTIVE_MENU,
} from './constants';

export const initialState = {
  drawer_state: true,
  active_menu: null,
};

/* eslint-disable default-case, no-param-reassign */
const drawerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_DRAWER_STATE:
        draft.drawer_state = action.payload;
        break;
      case CHANGE_ACTIVE_MENU:
        draft.active_menu = action.payload;
        break;
    }
  });

export default drawerReducer;
