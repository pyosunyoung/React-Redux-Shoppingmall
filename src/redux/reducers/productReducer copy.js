let initalState = {
  productList:[]
}

function productReducer(state=initalState, action) {
  let {type, payload} = action
  switch(type) {
    case "GET_PRODUCT_SUCCESS":
      return{...state, productList: payload.data}; // api 데이터값 productList에 넣어줌
    default:
      return {...state};
  }
}

export default productReducer;