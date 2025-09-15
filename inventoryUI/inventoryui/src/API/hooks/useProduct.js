import { APIEndpoints } from "./apiEndsPoints";     
import axios from "./axiosInstance";  
 import { toast } from 'react-toastify';
export default function useProduct() {
    async function fetchProduct() {
        try{
const response= await axios.get(`${APIEndpoints.AllProduct}`);
            return response;
            console.log(response.data,'product');
        }
        catch(error){
            console.log(error,'error');
throw error;
        }
    }
async function searchProduct(search) {
    try {
        const response = await axios.get(APIEndpoints.SearchallProduct(search));
        return response;
    } catch (error) {
        console.log(error, 'error');
        throw error;
    }
}
    
async function fetchBrand() {
    try {
        const response = await axios.get(APIEndpoints.GetBrands);
        return response.data;
    } catch (error) {
        toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
    }
}
async function createProduct(formData) {
    try {
        const response = await axios.post(`${APIEndpoints.CreateProduct}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
    }
}

async function updateProduct(formData) {
    try {
        const response = await axios.put(`${APIEndpoints.UpdateProduct}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
    }
}

async function updateProductById(id, formData) {
    try {
        const response = await axios.put(`${APIEndpoints.UpdateProduct}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
        throw error;
    }
}
    return{
          searchProduct ,
          fetchBrand,
        fetchProduct,
        createProduct,
        updateProduct,
        updateProductById
    };
};