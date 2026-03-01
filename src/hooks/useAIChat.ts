import axios from 'axios';
import { AI_ASSISTANT_BASE_URL } from '../config/env';

const aiAsst = axios.create({
  baseURL: AI_ASSISTANT_BASE_URL,
});

aiAsst.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('telepractice_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

aiAsst.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default aiAsst;
