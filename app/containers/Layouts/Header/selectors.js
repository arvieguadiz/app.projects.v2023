import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectHeaderDomain = state => state.header || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectHeader = () =>
  createSelector(
    selectHeaderDomain,
    substate => substate,
  );

const makeSelectTheme = () =>
  createSelector(
    selectHeaderDomain,
    substate => substate.theme,
  );

export default makeSelectHeader;
export {
  selectHeaderDomain,
  makeSelectTheme,
};
