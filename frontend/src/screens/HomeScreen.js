import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
// import axios from 'axios'

function HomeScreen() {
  // const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const [searchParams] = useSearchParams();

  let paramString = "";
  let paramArray = Object.fromEntries([...searchParams]);

  if (!Object.keys(paramArray).length == 0) {
    paramString = "?";
    for (let i in paramArray) {
      paramString = paramString + "" + i + "=" + paramArray[i] + "&";
    }
  }

  useEffect(() => {
    dispatch(listProducts(paramString));
    // async function fetchProducts(){
    //   const { data } = await axios.get('/api/products/')
    //   setProducts(data)
    // }

    // fetchProducts()
  }, [dispatch, paramString]);

  return (
    <div>
      {!paramString && <ProductCarousel/>}
      
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={paramString} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
