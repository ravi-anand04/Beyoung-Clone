const base_url = "https://academics.newtonschool.co";

export const CATEGORIES = `${base_url}/api/v1/ecommerce/clothes/categories`;
export const FILTERED_PRODUCTS = `${base_url}/api/v1/ecommerce/clothes/products?filter=`;
export const SEARCH_PRODUCTS = `${base_url}/api/v1/ecommerce/clothes/products?search={"name":`;
export const CART_ACTION = `${base_url}/api/v1/ecommerce/cart`;
export const ADD_TO_ORDER = `${base_url}/api/v1/ecommerce/order`;
export const ADD_TO_WISHLIST = `${base_url}/api/v1/ecommerce/wishlist`;
export const GET_MY_WISHLIST = `${base_url}/api/v1/ecommerce/wishlist`;
export const DELETE_FROM_WISHLIST = `${base_url}/api/v1/ecommerce/wishlist/{{productId}}`;
export const CLEAR_WISHLIST = `${base_url}/api/v1/ecommerce/wishlist`;

export const LOGIN_URL = `${base_url}/api/v1/user/login`;
export const SIGNUP_URL = `${base_url}/api/v1/user/signup`;

export const headers = {
  "Content-Type": "application/json",
  projectId: process.env.PROJECT_ID,
};


