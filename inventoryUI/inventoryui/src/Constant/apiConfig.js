// src/config/apiConfig.js
//for local

const BASE_URL = 'https://localhost:44390/api';

const API_URLS = {
    categories: `${BASE_URL}/Category`,
    suppliers: `${BASE_URL}/Supplier`,
    products: `${BASE_URL}/Product`,
    GetAllActiveSupplier: `${BASE_URL}/Supplier/GetAllActiveSupplier`,
    GetAllBrands: `${BASE_URL}/Product/GetAllBrands`,
    // Add other endpoints here as needed
};

export default API_URLS;
