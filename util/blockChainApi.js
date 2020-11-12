import axios from 'axios';

const blockChainApi = axios.create({
    baseURL: 'https://blockchain.info',
    timeout: 1000,
  });

export default blockChainApi;