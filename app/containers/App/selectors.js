import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the app state domain
 */

const selectAppDomain = state => state.app || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by App
 */

const makeSelectApp = () =>
  createSelector(
    selectAppDomain,
    substate => substate,
  );
const  makeSelectData = () =>
  createSelector(
    selectAppDomain,
    substate => substate.data,
  );

export default makeSelectApp;
export { selectAppDomain,makeSelectData };
