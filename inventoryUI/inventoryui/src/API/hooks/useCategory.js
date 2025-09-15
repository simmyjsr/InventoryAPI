// src/api/aboutService.js
import axios from './axiosInstance';
import  {APIEndpoints } from './apiEndsPoints';
import { toast } from 'react-toastify';

export default function  useCategory () {
 async function fetchCategory() {
    try {
      const response = await axios.get(`${APIEndpoints.AllCategory}`);
      return response.data;
    } catch (error) {
      toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
    }
  }
  return {
    
    fetchCategory

  };
};



//export default CategoryService;
