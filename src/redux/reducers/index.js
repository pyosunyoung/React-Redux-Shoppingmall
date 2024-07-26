import { combineReducers } from 'redux';
import authenticateReducer from './authenticateReducer';
import productReducer from './productSlice';


// reducer 파일 합치기 combineReducers사용 이것을 store에 던져줌
export default combineReducers({ 
  auth : authenticateReducer,
  product : productReducer,
});