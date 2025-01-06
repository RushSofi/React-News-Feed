import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mocki.io/v1',
  timeout: 3000,
});

api.interceptors.request.use((config) => {
  console.log('🚀 Запрос отправлен:', config);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ Ответ получен:', response);
    return response;
  },
  (error) => {
    console.error('❌ Ошибка запроса:', error);
    return Promise.reject(error);
  }
);

export default api;