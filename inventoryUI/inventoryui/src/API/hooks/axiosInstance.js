// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44390/api',
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use((config) => {
 // JSON.parse(localStorage.getItem('token'));
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   // console.log('Token:', token); // Debugging line to check the token
  }
  return config;
});

export default axiosInstance;
