export const SERVER_URL = 'http://localhost:3000/api/v1';
export const environment = {
  production: false,
  LOGIN_URL: `${SERVER_URL}/users/login`,
  GET_PRODUCTS_URL: `${SERVER_URL}/products`,
  GET_PRODUCT_URL: `${SERVER_URL}/products/:id`,
  GET_CATERGORIES_URL: `${SERVER_URL}/categories`,
  POST_CATERGORIES_URL: `${SERVER_URL}/categories`,
  DELETE_CATERGORIES_URL: `${SERVER_URL}/categories/:id`,
  GET_CATEGORY_URL: `${SERVER_URL}/categories/:id`,
  UPDATE_CATEGORY_URL: `${SERVER_URL}/categories/:id`,
}
