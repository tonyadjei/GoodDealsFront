import axios from 'axios';

export const products_api = axios.create({
    baseURL: 'http://localhost:8080/ecommerce/api/v1/products',
    headers: {
        Accept: 'application/json',
        
    }
})