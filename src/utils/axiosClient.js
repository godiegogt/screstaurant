import axios from 'axios';
import {store} from '../app/store'; // Import your Redux store
import {URL_API,} from '../constants/variables'

const axiosClient = axios.create({
  headers:{'Content-Type':'application/json'}
});

// Add a request interceptor to attach the token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const { data } = store.getState().configuration.token;

    const URL = store.getState().configuration.URL; // Get url

    if (URL) {
      config.baseURL = URL+"/Api";
    }
    if (data) {
      config.headers.Authorization = `Bearer ${data}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});



export default axiosClient;