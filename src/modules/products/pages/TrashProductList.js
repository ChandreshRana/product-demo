import { Card, Col, Empty, Row, Spin } from 'antd';
import { cloneDeep, filter } from 'lodash';
import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import { getProducts, setProductToStore } from '../../../common/utils';
import ProductListIem from '../components/ProductListItem';

const TrashProductList = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([])

  useEffect(() => {
    getTrashProductsData()
  }, [])

  const getTrashProductsData = () => {
    setLoading(true);
    let productsData = getProducts();
    const localPromise = new Promise((resolutionFunc, rejectionFunc) => {
      setTimeout(() => {
        const products = filter(productsData, (prodObj) => prodObj.isDeleted)
        resolutionFunc(products)
      }, 100)
    })
    localPromise.then((res) => {
      setProducts(res)
      setLoading(false)
    })
  }

  const onRestoreHandle = (data) => {
    setLoading(true);
    let productsData = cloneDeep(getProducts());
    const localPromise = new Promise((resolutionFunc, rejectionFunc) => {
      setTimeout(() => {
        let index = productsData.findIndex(function (o) {
          return o.productId === data.productId;
        })
        if (productsData[index].isDeleted) {
          productsData[index].isDeleted = false
        }
        resolutionFunc(productsData)
      }, 100)
    })
    localPromise.then((res) => {
      setProducts([])
      setProductToStore(res)
      getTrashProductsData()
      setLoading(false)
    })
  };

  const deleteProductById = (productId) => {
    setLoading(true);
    let productsData = getProducts();
    const localPromise = new Promise((resolutionFunc, rejectionFunc) => {
      setTimeout(() => {
        let index = productsData.findIndex(function (o) {
          return o.productId === productId;
        })
        if (productsData[index].isDeleted) {
          if (index !== -1) {
            productsData.splice(index, 1);
          }
        }
        resolutionFunc(productsData)
      }, 100)
    })
    localPromise.then((res) => {
      setProducts([])
      setProductToStore(res)
      getTrashProductsData()
      setLoading(false)
    })
  }

  const onDeleteHandle = (data) => {
    deleteProductById(data.productId)
  };

  if (loading) {
    return (
      <Card>
        <Spin className="d-flex align-items-center justify-content-center" />
      </Card>
    );
  }

  return (
    <Card>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Trash Products</h1>
      </div>

      <hr />

      {
        (products.length > 0)
          ? <div className='mt-2'>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {products.map((product) => {
                return <Col key={product.productId} className="gutter-row" span={6}>
                  <ProductListIem history={history}
                    product={product}
                    onDeleteHandle={onDeleteHandle}
                    onRestoreHandle={onRestoreHandle} />
                </Col>
              })}
            </Row>
          </div>
          : <Empty />
      }

    </Card>
  );
};

export default withRouter(TrashProductList);
