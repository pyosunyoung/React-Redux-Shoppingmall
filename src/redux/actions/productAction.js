import { productActions } from '../reducers/productSlice'; // 최신문법, slice action 값 가져옴

//function getProducts(keyword) {
  //return async(dispatch, getState) => { // 미들웨어 함수임, 안에는 매개변수 두개가 들감 getstate는 현재의 state를 가져오는것
    //let url = `https://my-json-server.typicode.com/legobitna/hnm-react-router/products?q=${keyword}`;
    //let response = await fetch(url);
    //let data = await response.json();
    // dispatch({type:"GET_PRODUCT_SUCCESS", payload:{data}})
   // dispatch(productActions.getAllproducts({data}));// 최신문법 : 객체 줄 필요없이 이렇게 함수를 호출하면 됨, payload는 함수에 매개변수로 전달해주면 됨
  //} // 이렇게 해주면 payload아래에 자동으로 data가 들어감
//}

 // 여러개 함수를 객체에 담아서 리턴?

function getProductDetail(id) {
  return async (dispatch) => {
    let url = `https://my-json-server.typicode.com/legobitna/noona-hnm/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    // dispatch({ type: "GET_SINGLE_PRODUCT_SUCCESS", payload: { data } });
    dispatch(productActions.getSingleProduct({data}));
  };
}
//export const productAction = { getProducts, getProductDetail };  // 여러개 함수를 객체에 담아서 리턴?
export const productAction = {getProductDetail };// 최신 문법 tool