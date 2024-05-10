import axios from 'axios';
import {store} from '../app/store'; // Import your Redux store

const axiosClient = axios.create({
  baseURL: 'http://192.168.0.3:3000',
  headers:{'Content-Type':'application/json'}
});

// Add a request interceptor to attach the token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const { token } = store.getState().configuration;
    console.log('Token: ',token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if(response.status==200){
    return response.data;
  }else{
    return null
  }
 
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default axiosClient;