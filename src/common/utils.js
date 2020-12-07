import { PRODUCTS, REGEX } from './constants';

// array in local storage for registered users
let products = JSON.parse(localStorage.getItem(PRODUCTS)) || [];

export const formValidatorRules = {
  required: {
    validator(rule, value) {
      if (!value) {
        return Promise.reject("Required");
      } else if (value && typeof (value) === 'string' && value.trim().length === 0) {
        return Promise.reject("Required");
      } else if (value && typeof (value) === 'object' && Array.isArray(value) && value.length === 0) {
        return Promise.reject("Required");
      }
      return Promise.resolve();
    },
  },
  email: {
    type: 'email',
    message: 'The input is not valid E-mail!'
  },
  number: () => ({
    validator(rule, value) {
      if (!value) {
        return Promise.resolve();
      }
      if (!Number(value) || !REGEX.NUMBER.test(Number(value))) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('Should be a valid Number');
      }
      return Promise.resolve();
    }
  }),
  validImage: () => ({
    validator(rule, value) {
      if (!value) {
        return Promise.resolve();
      }
      if (!REGEX.IMAGE_URL.test(value)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('Should be a valid image url');
      }
      return Promise.resolve();
    }
  })
};

export const formatPrice = (price) => {
  const formatedPrice = price || 0;

  return Number(formatedPrice).toLocaleString('en', {
    style: 'currency',
    currency: 'INR'
  });
};

export const getProducts = () => {
  return JSON.parse(localStorage.getItem(PRODUCTS)) || [];
};

export const setProductToStore = (products) => {
  localStorage.setItem(PRODUCTS, JSON.stringify(products));
};
