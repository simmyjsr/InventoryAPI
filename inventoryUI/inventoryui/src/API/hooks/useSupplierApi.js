// src/api/aboutService.js
import axios from './axiosInstance';
import  {APIEndpoints } from './apiEndsPoints';
import { toast } from 'react-toastify';

export default function  useSupplierApi () {
 async function fetchSupplier() {
    try {
      const response = await axios.get(`${APIEndpoints.AllActiveSupplier}`);
      return response.data;
    } catch (error) {
      toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
    }
  }
  return {
    
    fetchSupplier
    
  };
};



//export default CategoryService;
