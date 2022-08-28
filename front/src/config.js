import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800/api',
});

const firebaseConfig = {
  apiKey: 'AIzaSyAWNgmSX1CBm6mQLP9dHM4RlHLVKDj3LMY',
  authDomain: 'filesharing-6b6b7.firebaseapp.com',
  projectId: 'filesharing-6b6b7',
  storageBucket: 'filesharing-6b6b7.appspot.com',
  messagingSenderId: '402428142745',
  appId: '1:402428142745:web:d3938876ac937115d50408',
  measurementId: 'G-MZFB1N9ZKE',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
