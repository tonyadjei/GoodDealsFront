import axios from "axios";

export const products_api = axios.create({
  baseURL: "http://localhost:8080/ecommerce/api/v1/products",
  headers: {
    Accept: "application/json",
  },
});

export const auth_api = axios.create({
  baseURL: "http://localhost:8080/ecommerce/api/v1/auth",
  headers: {
    Accept: "application/json",
  },
});

export const user_api = axios.create({
  baseURL: "http://localhost:8080/ecommerce/api/v1/users",
  headers: {
    Accept: "application/json",
  },
});
