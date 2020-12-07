import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, HeartFilled, HeartOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Card, Image, Modal, Space, Tooltip } from 'antd';
import React from 'react';
import { formatPrice } from '../../../common/utils';
import '../productStyle.less';

const { confirm } = Modal;

const ProductListItem = (props) => {
  const { product } = props;

  const onProductClick = (product) => {
    const { productId } = product;
    if (productId && props.history) {
      props.history.push(`/product/view/${productId}`);
    }
  }

  const onDeleteClick = (e) => {
    e.stopPropagation();
    confirm({
      closable: true,
      icon: <ExclamationCircleOutlined />,
      title: "Are you Sure?",
      content: "Do you want to remove this product?",
      okType: "danger",
      onOk: () => {
        props.onDeleteHandle(product);
      },
    });
  }

  const onEditClick = (e) => {
    e.stopPropagation();
    if (product.isDeleted && props.onRestoreHandle) {
      props.onRestoreHandle(product)
    } else {
      props.onEditHandle(product);
    }
  }

  const onLikeClick = (e) => {
    e.stopPropagation();
    if(props.onLikeHandle){
      props.onLikeHandle(product);
    }
  }

  return (
    <Card key={product.productId} className="product-card cursor-pointer" onClick={() => onProductClick(product)}>
      <div className="d-flex flex-column">
        <div onClick={(e) => { e.stopPropagation() }}>
          <Space size={12}>
            <Image src={product.image} />
          </Space>
        </div>
        <div style={{ position: 'absolute', right: 35, top: 35 }}>
          {product.isLike ? <HeartOutlined  onClick={onLikeClick}/> : <HeartFilled fill='red' onClick={onLikeClick}/>}
        </div>
        <div className='card-content-container'>
          <div className='p-1 mt-1'>
            <h4 className='mb-0'>{product.title}</h4>
          </div>
          <div className='p-1'>
            <h4>Rs. <span className='color-grey'>{` ${formatPrice(product.price)}`}</span></h4>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-center">
          <Tooltip title={product.isDeleted ? "Restore" : "Edit"}>
            <Button size="sm" onClick={onEditClick}>
              {product.isDeleted ? <RollbackOutlined /> : <EditOutlined />}
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button className="ml-1" size="sm" danger onClick={onDeleteClick}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default ProductListItem;
