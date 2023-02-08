/*
 *
 * Header actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_THEME,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeTheme(payload) {
  return {
    type: CHANGE_THEME,
    payload,
  };
}
