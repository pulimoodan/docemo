import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((request) => {
  const token = Cookies.get('docemo-admin-token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return request;
});

export default api;
