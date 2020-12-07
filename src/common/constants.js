/* ROUTERS  */
export const ROUTES = {
  HOME: '/',
  PRODUCT_VIEW: '/product/view/:id',
  TRASH: '/trash'
};

/*  Modules */
export const MODULES = {
  HOME: 'Home',
  TRASH: 'Trash'
};

/* STORE */
export const PRODUCTS = 'PRODUCTS';

export const LOCATIONS = [
  { 'key': 'AHEMEDABAD', 'value': 'Ahemedabad' },
  { 'key': 'MUMBAI', 'value': 'Mumbai' },
  { 'key': 'SURAT', 'value': 'Surat' },
];

export const PRODUCT_TYPES = [
  { 'key': 'TOP_WEAR', 'value': 'Top Wear' },
  { 'key': 'BOTTOM_WEAR', 'value': 'Bottom Wear' },
  { 'key': 'FOOTER_WEAR', 'value': 'Footer Wear' },
];

export const IN_STOCK = 'IN_STOCK';
export const OUT_OF_STOCK = 'OUT_OF_STOCK';

export const REGEX = {
  // AMOUNT: /^\d+$|^\d+\.\d*$/,
  NUMBER: /^\d+$/,
  IMAGE_URL: /(https?:\/\/.*\.(?:png|jpg))/i
};
