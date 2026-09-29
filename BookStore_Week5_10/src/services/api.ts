import axios from 'axios'; import AsyncStorage from '@react-native-async-storage/async-storage'; import {API_BASE_URL} from '../config/api';
export const api=axios.create({baseURL:API_BASE_URL,timeout:8000});
api.interceptors.request.use(async config=>{const token=await AsyncStorage.getItem('token'); if(token) config.headers.Authorization=`Bearer ${token}`; return config;});
