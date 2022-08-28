import axios from 'axios';
import { axiosInstance } from '../config';
import { loginStart, loginFailure, loginSuccess } from './authActions';

export const loginCall = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    window.location.reload(false);
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const registerCall = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post('/auth/register', user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const updateCall = async (user, dispatch, id) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.put(`/users/${id}`, user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const updatePassword = async (user, id) => {
  await axiosInstance.put(`/users/updatepassword/${id}`, user);
};
