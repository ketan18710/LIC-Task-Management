/*
 *
 * App actions
 *
 */

import { DEFAULT_ACTION, GET_DATA,SET_DATA} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const getData = () => ({
  type: GET_DATA,
})
export const setData = data => ({
  type: SET_DATA,
  payload: data
})
