const apiConfig = {
  development: {
    baseURL: 'https://dev.api.example.com',
    timeout: 1000,
  },
  production: {
    baseURL: 'https://api.example.com',
    timeout: 2000,
  },
  test: {
    baseURL: 'https://test.api.example.com',
    timeout: 500,
  },
};

export default apiConfig;