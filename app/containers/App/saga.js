import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import {request} from 'utils/common'
import {API_CONSTANTS,PROD_DOMAIN,STATUS_CODES} from 'utils/constants'
import { setData} from './actions'

// Individual exports for testing
export default function* appSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_DATA, getDataFunc);
}
function* getDataFunc(){
  try{
    const userData =  yield call(
      request, 
      `${PROD_DOMAIN}/data/last`,
      {
          method: 'GET',
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      }
    ) 
    console.log(userData)
    debugger
    const {statusCode} = userData
    if(statusCode === STATUS_CODES.SUCCESS){
      yield put(
        setData({
          status: API_CONSTANTS.success,
          data: userData.data.data
        }),
      );
    }else{
      yield put(
        setData({
          status: API_CONSTANTS.error,
          data: userData.error
        }),
      );
    }
  }catch (err) {
    // Set error state
    console.log(err);
    yield put(
      setData({
        status: API_CONSTANTS.error,
        data: err.message
      }),
    );
    debugger
    // yield put(setFetchUserData({ status: API_CONSTANTS.error }));
  }
}