/*
 *
 * Drawer actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_DRAWER_STATE,
  CHANGE_ACTIVE_MENU,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeDrawerState(payload) {
  return {
    type: CHANGE_DRAWER_STATE,
    payload,
  };
}

export function changeActiveMenu(payload) {
  return {
    type: CHANGE_ACTIVE_MENU,
    payload,
  };
}
