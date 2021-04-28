/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION,GET_DATA, SET_DATA} from './constants';
import { API_CONSTANTS } from '../../utils/constants';
export const initialState = {
  data : {
    status : API_CONSTANTS.init,
    data : null
  },
  
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState,  { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case DEFAULT_ACTION:
        break;
      case GET_DATA : {
        draft.config.status = API_CONSTANTS.loading
        break;
      }
      case SET_DATA : {
        draft.config.status = payload.status;
        draft.config.data = payload.data;
        break;
      }
    }
  });

export default appReducer;
