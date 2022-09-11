import Cookies from 'js-cookie';
import api from './api';

export const AuthService = {
  login: async (email, password) => {
    const { data: response } = await api.post('/auth/login', {
      email,
      password,
    });
    if (response) {
      console.log('Got token');
      Cookies.set('docemo-admin-token', response.token, { expires: 60 });
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      return response.user;
    }
    return false;
  },

  logout: async () => {
    Cookies.remove('docemo-admin-token');
    delete api.defaults.headers.common['Authorization'];
  },

  getUser: async () => {
    try {
      const { data: user } = await api.get('/auth/profile');
      return user;
    } catch (error) {
      console.log('Error', error);
    }
    return false;
  },
};
