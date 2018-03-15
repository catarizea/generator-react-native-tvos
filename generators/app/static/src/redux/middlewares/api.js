import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { API_BASE_URL } from '../../constants/paths';

const apiMiddleware = device => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    responseType: 'json',
  });

  return axiosMiddleware(apiClient, {
    returnRejectedPromiseOnError: true,
    interceptors: {
      request: [
        (store, config) => {
          Object.assign(config, {
            headers: {
              ...(config.headers || {}),
              uuid: device.uuid,
            },
          });
          return config;
        },
      ],
    },
  });
};

export default apiMiddleware;
