function getProducts(keyword) {
  return async(dispatch, getState) => { // 미들웨어 함수임, 안에는 매개변수 두개가 들감 getstate는 현재의 state를 가져오는것
    let url = `https://my-json-server.typicode.com/legobitna/hnm-react-router/products?q=${keyword}`;
    let response = await fetch(url);
    let data = await response.json();
    dispatch({type:"GET_PRODUCT_SUCCESS", payload:{data}})
  }
}

export const productAction={getProducts} // 여러개 함수를 객체에 담아서 리턴?