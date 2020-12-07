import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Image, Rate, Row, Spin } from 'antd';
import { find, get, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { formatPrice, getProducts } from '../../common/utils';

const ProductView = (props) => {
  const productId = get(props, "match.params.id");
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      getSelectedProductData(productId);
    }
  }, [productId]);

  const getSelectedProductData = (productId) => {
    setLoading(true);
    let productsData = getProducts();
    const localPromise = new Promise((resolutionFunc, rejectionFunc) => {
      setTimeout(() => {
        const matchProduct = find(productsData, (prodObj) => prodObj.productId === productId)
        if (matchProduct && matchProduct) {
          resolutionFunc(matchProduct)
        } else {
          rejectionFunc(null)
        }
      }, 100)
    })
    localPromise.then((res) => {
      if (res && res.productId) {
        setCurrentProduct(res)
      }
      setLoading(false)
    })
  }

  if (!loading && currentProduct && !isEmpty(currentProduct)) {
    return (
      <Card>
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="d-flex flex-row align-items-center">
            <ArrowLeftOutlined className="mr-2"
              onClick={() => {
                props.history.goBack();
              }}
            />
            <div className="word-break-all">{currentProduct.title}</div>
          </h2>
        </div>
        <hr />
        <Row>
          <Col flex='300px' className='p-2'>
            <Image src={currentProduct.image} />
          </Col>
          <Col flex='auto' className='p-2'>
            <Descriptions title={currentProduct.title}>
              <Descriptions.Item contentStyle={{ wordBreak: 'break-all' }}>
                {currentProduct.description}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label='Price' contentStyle={{ wordBreak: 'break-all' }}>
                {formatPrice(currentProduct.price)}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label='Rating' labelStyle={{ paddingTop: '5px' }}>
                <Rate value={currentProduct.rating} />
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    );
  }

  return (
    <Card>
      <Spin className="d-flex align-items-center justify-content-center" />
    </Card>
  );

};

export default ProductView;