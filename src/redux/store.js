import { createStore, applyMiddleware } from "redux";

import {thunk} from "redux-thunk";  // thunk를 이렇게 임포트합니다
import rootReducer from "./reducers" // reducer파일 합친거 가져오기 임의로 이름 정해줌
import { composeWithDevTools } from '@redux-devtools/extension';

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productSlice';
import authenticateReducer from './reducers/authenticateReducer';

//const store = createStore(rootReducer,
  //composeWithDevTools(applyMiddleware(thunk))
//);

const store = configureStore({ // 이런식으로 최신문법 사용
  reducer : {
    auth : authenticateReducer,
    product : productReducer,
  }
})
// middleware 사용법, 두번째 인자로 전해줌
// 미들웨어는 async 함수들을 주로 다룸
// 이렇게 rootReducer를 던져주면, state값은 auth state인지, product state인지 어떤 state인지
//모르기 때문에 값 가져올 때 state.auth.머머머 이렇게 가져와야 함
//useSelector로 값 가져올 떄 

//여기선 예전문법 combinreducer를 통해 rootReducer로 보냄
// 그리고 thunk, applyMiddleware, composeWithDevTools이렇게 많은 것을 써야함

// 최신문법 createStore이제 사용 안함 없어짐 , configureStore사용함
// 최신문법에는 composeWithDevTools, thunk, applyMiddleware,combinreducer가 모두
// configureStore안에 들어가있음 개꿀
export default store;
