import { Button, Card, Checkbox, Col, Empty, Row, Spin } from 'antd';
import { clone, filter } from 'lodash';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { LOCATIONS } from '../../common/constants';
import { getProducts, setProductToStore } from '../../common/utils';
import ProductListIem from '../products/components/ProductListItem';
import ProductModal from './ProductModal';

const CheckboxGroup = Checkbox.Group;

const ProductList = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState();
  const [products, setProducts] = useState([])
  const [likeFilter, setLikeFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState();

  useEffect(() => {
    getProductsData()
  }, [])

  const getProductsData = () => {
    setLoading(true);
    let productsData = getProducts();
    const localPromise = new Promise((resolutionFunc, rejectionFunc) => {
      setTimeout(() => {
        console.log('likeFilter: ', likeFilter)
        console.log('priceFilter: ', priceFilter)
        console.log('locationFilter: ', locationFilter)
        // here we can filter here data
        const products = filter(productsData, (prodObj) => !prodObj.isDeleted)
        resolutionFunc(products)
      }, 100)
    })
    localPromise.then((res) => {
      if (res) {
        setProducts(res)
      }
      setLoading(false)
    })
  }

  const updateProductData = (product, updateProp) => {
    setLoading(true);
    let productsData = getProducts();
    const localPromise = new Promise((resolutionFunc, rejectionFunc) => {
      setTimeout(() => {
        let index = productsData.findIndex(function (o) {
          return o.productId === product.productId;
        })
        let updateIndexData = clone(productsData[index])
        updateIndexData = { ...updateIndexData, ...updateProp }
        productsData[index] = clone(updateIndexData)
        resolutionFunc(productsData)
      }, 100)
    })
    localPromise.then((res) => {
      setProductToStore(res)
      getProductsData()
      setLoading(false)
    })
  }

  const handleAdd = () => {
    setShowModal(true);
  };

  const onEditHandle = (data) => {
    setSelectedProductData(data);
    setShowModal(true);
  };

  const onDeleteHandle = (data) => {
    updateProductData(data, { 'isDeleted': true })
  };

  const onLikeHandle = (data) => {
    updateProductData(data, { 'isLike': !data.isLike })
  };

  const onSubmitCallbk = (data) => {
    setProducts([]);
    getProductsData();
  };

  const onLikeChange = (e) => {
    setLikeFilter(e.target.checked);
    getProductsData();
  }

  const onChange = (e) => {
    setPriceFilter(e.target.checked);
    getProductsData();
  }

  const onLocationChange = list => {
    setLocationFilter(list);
    getProductsData();
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
      {showModal && (
        <ProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedProductData={setSelectedProductData}
          selectedProductData={selectedProductData}
          isUpdate={!!selectedProductData}
          onSubmit={onSubmitCallbk}
        />
      )}
      <div>
        <Checkbox onChange={onLikeChange} checked={likeFilter}>Like</Checkbox>
        <Checkbox onChange={onChange} checked={priceFilter}>Price (500 -1000)</Checkbox>
        <div className='mt-2'>
          <h2>Locations: </h2>
          <CheckboxGroup value={locationFilter} options={LOCATIONS.map((data) => data.key)} onChange={onLocationChange} />
        </div>
      </div>
      <hr />
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products</h1>
        <Button type="primary" onClick={handleAdd}>
          Add Product
         </Button>
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
                    onLikeHandle={onLikeHandle}
                    onDeleteHandle={onDeleteHandle}
                    onEditHandle={onEditHandle} />
                </Col>
              })}
            </Row>
          </div>
          : <Empty />
      }
    </Card>
  );
};

export default withRouter(ProductList);
