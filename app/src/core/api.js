import axios from 'axios';
import {Platform} from 'react-native';

export const ADDRESS =
  Platform.OS === 'ios'
    ? 'localhost:8000' // for ios simulator
    : '10.0.2.2:8000'; // for android simulator device
const api = axios.create({
  baseURL: `http://${ADDRESS}`, // for android simulator device
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
