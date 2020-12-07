import { Form, Input, InputNumber, Radio, Rate, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { cloneDeep, findIndex } from 'lodash';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IN_STOCK, LOCATIONS, OUT_OF_STOCK, PRODUCT_TYPES } from '../../common/constants';
import { formValidatorRules, getProducts, setProductToStore } from '../../common/utils';

const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

const { required, number, validImage } = formValidatorRules;

const ProductModal = (props) => {
  const { isUpdate, showModal, setShowModal, selectedProductData, setSelectedProductData } = props;
  const [loading, setLoading] = useState(false);
  // const [initialFormValues, setFormInitialValues] = useState({});
  const [form] = Form.useForm();

  // useEffect(() => {
  //   setInitialValues()
  // }, [])

  // const setInitialValues = () => {
  //   const initialValues = cloneDeep(selectedProductData);
  //   if (initialValues) {
  //     setFormInitialValues(initialValues)
  //   } else {
  //     setFormInitialValues({ ...initialValues, ...{ isStock: IN_STOCK } })
  //   }
  // }

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
    setSelectedProductData();
  };

  const onSubmitFinish = async (values) => {
    setLoading(true);
    let cloneValues = cloneDeep(values)
    const localPromise = new Promise((resolutionFunc, rejectionFunc) => {
      setTimeout(() => {
        let products = getProducts();
        let cloneProductData = cloneDeep(products)
        if (isUpdate) {
          cloneValues.productId = selectedProductData.productId
          const matchIndex = findIndex(cloneProductData, (prodObj) => prodObj.productId === selectedProductData.productId)
          if (matchIndex >= 0) {
            cloneProductData[matchIndex] = cloneValues
          }
        } else {
          cloneValues.productId = uuidv4();
          cloneValues.isDeleted = false;
          cloneValues.isLike = true;
          cloneProductData.push(cloneValues)
        }
        resolutionFunc(cloneProductData)
      }, 100)
    })
    localPromise.then((res) => {
      setProductToStore(res)
      form.resetFields();
      props.onSubmit(res)
      setShowModal(false);
      setLoading(false)
    })

  };

  const handleAdd = () => {
    setShowModal(true);
    form.submit();
  };

  return (
    <Modal
      title={isUpdate ? 'Edit Product' : 'Add Product'}
      visible={showModal}
      confirmLoading={loading}
      onOk={handleAdd}
      className="dialog"
      okText={isUpdate ? 'Update' : 'Add'}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        initialValues={selectedProductData}
        // initialValues={{
        //   ...initialFormValues,
        // }}
        layout="vertical"
        onFinish={onSubmitFinish}
      >
        <Form.Item rules={[required]} name="title" label="Title">
          <Input allowClear maxLength={50} />
        </Form.Item>
        <Form.Item rules={[required]} name="description" label="Description">
          <TextArea maxLength={150} allowClear rows={3} className="pr-4 pt-3" />
        </Form.Item>
        <Form.Item rules={[required, validImage]} name="image" label="Image url">
          <Input allowClear />
        </Form.Item>
        <Form.Item rules={[required, number]} name="price" label="Price">
          <InputNumber allowClear min={50} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item name="rating" label="Rating">
          <Rate defaultValue={0} />
        </Form.Item>
        <Form.Item
          name="locations"
          rules={[required]}
          label="Select locations"
        >
          <Select
            mode="multiple"
            className="mr-3"
            placeholder="Locations"
            allowClear
          >
            {LOCATIONS.map((location) => (
              <Option key={location.key} value={location.key}>
                {location.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="productType"
          rules={[required]}
          label="Select Product Type"
        >
          <Select
            className="mr-3"
            placeholder="Product Type"
            allowClear
          >
            {PRODUCT_TYPES.map((prodType) => (
              <Option key={prodType.key} value={prodType.key}>
                {prodType.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="isStock"
          label="Stock"
        >
          <Radio.Group name="radiogroup" defaultValue={IN_STOCK}>
            <Radio value={IN_STOCK}>Stock</Radio>
            <Radio value={OUT_OF_STOCK}>Out of Stock</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
