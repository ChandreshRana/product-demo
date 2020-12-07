// import { Card } from 'antd';
import React, { Fragment, useEffect } from 'react';
import dummyProductData from '../../assets/data/dummy.json';
import { PRODUCTS } from '../../common/constants';
import { getProducts } from '../../common/utils';
import ProductList from '../products/ProductList';
import './dashboard.less'; // individual css file that you can import

const Dashboard = () => {
  useEffect(() => {
    let productData = getProducts()
    if(productData && Array.isArray(productData) && productData.length === 0){
      productData = dummyProductData
      localStorage.setItem(PRODUCTS,JSON.stringify(productData))
    }
  }, []);

  return (
    // <Card>
    //   <div className="d-flex align-items-center justify-content-between">
    //     <h1 className="aaaaa">Dashboard</h1>
    //   </div>
    //   <hr />
    // </Card>
    <Fragment>
      <ProductList />
    </Fragment>
  );
};

export default Dashboard;
