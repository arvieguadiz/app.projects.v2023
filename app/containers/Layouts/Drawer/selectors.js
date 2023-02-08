import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the drawer state domain
 */

const selectDrawerDomain = state => state.drawer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Drawer
 */

const makeSelectDrawer = () =>
  createSelector(
    selectDrawerDomain,
    substate => substate,
  );

const makeSelectDrawerState = () =>
  createSelector(
    selectDrawerDomain,
    substate => substate.drawer_state,
  );

const makeSelectActiveMenu = () =>
  createSelector(
    selectDrawerDomain,
    substate => substate.active_menu,
  );

export default makeSelectDrawer;
export {
  selectDrawerDomain,
  makeSelectDrawerState,
  makeSelectActiveMenu,
};
