import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
//createSlice reducer를 만드는걸 도와줌
// createSlice 객체 안에는 name, initalstate, reducer가 들어감
// reducer 객체에는 모두 함수가 들어감 예전 문법인 if나 switch같은 것을 함수로 줄인것
let initialState = {
  productList: [],
  selectedItem: null,
  isLoading:false,
  error:null,
};

export const fetchProducts = createAsyncThunk('product/fetchAll', async(keyword, thunkApi)=>{ //이게 productAction대체자임
  try {
    let url = `https://my-json-server.typicode.com/legobitna/hnm-react-router/products?q=${keyword}`;
    let response = await fetch(url);
    return await response.json();
  } catch(error){
    thunkApi.rejectWithValue(error.message);//reject case를 값(에러메시지)과 함께 강제로 호출하는 코드
  }
  
  //createAsync는 promise를 리턴해야함, await을 사용하면 promise를 리턴받을 수 있움
  //let data = await response.json(); 원래는 이건데 저렇게 return하면 알아서 리턴해줌
}) 
// 두가지 매개변수를 받음, 액션의 이름값과, 
//콜백함수(여기서도 두개의 매개변수를 받음, 1. api호출전 넘기는 값 data, product id값 등이 담김)
//2.thunkapi값이 담김, dispatch, getstate, rejectWithvalue 등등 많음

// function productReducer(state = initialState, action) {
//   let { type, payload } = action;
//   switch (type) {
//     case "GET_PRODUCT_SUCCESS":
//       return { ...state, productList: payload.data }; // 기존값 유지하되 productList를 바꿔주자
//     case "GET_SINGLE_PRODUCT_SUCCESS":
//       return { ...state, selectedItem: payload.data };
//     default:
//       return { ...state };
//   }
// }

// export default productReducer;
// 밑에는 최신 문법
const productSlice = createSlice({
  name : "product",
  initialState ,
  reducers :{ // 이 reducer는 필요가 없어짐
    //getAllproducts(state, action) { //두개 매개변수는 예전 문법, state action과 동일한 기능
      //state.productList = action.payload.data // 최신문법에는 return ...state 생략 가능
    //},
    getSingleProduct(state, action) { // 다른 case를 만들어주고 싶으면 여기선 함수를 하나 더 생성하면 됨
      state.selectedItem = action.payload.data
    }
  } ,
  extraReducers: (builder)=>{ //데이터를 성공적으로 가져왔는지 실패했는지 판단, redux는 async지원x 
    builder.addCase(fetchProducts.pending, (state)=>{ // builder라는 매개변수를 가지고 있음 , case추가 가능
      state.isLoading=true // 로딩스피너 돌아감 값 가져오는 동안
    }) 
    .addCase(fetchProducts.fulfilled, (state,action) => { // 값을 성공적으로 받았을 때 일어나는 함수
      state.isLoading=false // 값 가져왔으니 false로 변경
      state.productList = action.payload;
    })
    .addCase(fetchProducts.rejected,(state,action)=>{ // 에러 났을 때 
      state.isLoading=false // 오류니까 당연히 값 못가져옴
      state.error=action.payload // errormessage를 payload에 넣어줄 수 있음
    })
  }   
})
console.log(productSlice);
//reducer는 원래 바로바로 action이 호출이 되어지는 애들, redux에서 직접적으로 호출
//thunk라던가 외부 라이브러리에 의해 호출이 되는 case는 extraReducer에 넣어줌
//createasyncsthunk는 직접적으로 호출하지 않아도 알아서 상황에 맞춰서 reducer를 호출하게 만들 수 있음
export const productActions = productSlice.actions
export default productSlice.reducer // 이렇게 reducer만 store에 전달해주면 됨

// 그렇다면 이 action은 type으로 가져왔는데 이것을 어떻게 최신문법으로 변경해야 할까? 
// action 파일 ㄲ ㄱ 그전에 slice에서 action도 export해줘야 함 

//tookit에서는 reducer, action 분리할 필요없이 slice란 한 파일에서 관리하자
// 이렇게 할꺼임

//즉 reducer과 extraReducers의 차이는
// reducers: 동기적으로 자신의 state를 바꾸는 경우, 바로바로 값 변경
// extraReducers: 외부로 부터 state가 바뀌는 경우 비동기 케이스 주로 처리
// extraReducers안에는 3가지 케이스 에러 완료 값 전달 케이스를 만들 수 있는데
// 예전 dipatch를 사용할때는 data api를 가져올 떄 성공한 케이스에 따라  dispatch를
//따로따로 전부 설정해줘야 했음 productaction 9번쨰 줄 참고 전부 성공해야 dispatch호출했음
// 하지만 이건 promise case, full, reject, pending(데이터 오는중) case에 따라 알아서
// 호출해줌 아주 좋다