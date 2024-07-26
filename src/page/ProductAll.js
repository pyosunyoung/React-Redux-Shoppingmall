import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import {productAction} from '../redux/actions/productAction'
import {useDispatch, useSelector} from "react-redux"
import { fetchProducts } from '../redux/reducers/productSlice';

const ProductAll = () => {
  const productList = useSelector((state) => state.product.productList); 
  // reducer 파일을 합칠 때 객체로 reducer를 던져줘서  (state) => state.productList 이렇게 해줘버리면
  // 어떤 파일의 state에서 값을 가져오는지 모르기 떄문에 state.product.productList 이렇게 지정해줘야 함 파일 합칠 떄 combine사용시
  const [query, setQuery] = useSearchParams();
  let [error, setError] = useState("");
  const dispatch = useDispatch();
  const getProducts = async () => {
    try {
      let keyword = query.get("q") || "";
      //dispatch(productAction.getProducts(keyword)) // productAction이란 미들웨어를 거쳐서 reducer로 감
      dispatch(fetchProducts(keyword)); // 최신 문법 tool
      // if (data.length < 1) {
      //   if (keyword !== "") {
      //     setError(`${keyword}와 일치하는 상품이 없습니다`);
      //   } else {
      //     throw new Error("결과가 없습니다");
      //   }
      // }
      
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [query]);
  return (
    <Container>
      {error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <Row>
          {productList.length > 0 &&
            productList.map((item) => (
              <Col md={3} sm={12} key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductAll;
