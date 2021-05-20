import api from '../../api/api';
import {
  register,
  login,
  current,
  logout,
  setToken,
  unsetToken,
} from './slice';
import { setLoader, unsetLoader } from '../loader/slice';
import { setError } from '../error/slice';
export const registerOperation = data => async dispatch => {
  try {
    dispatch(setLoader(true));
    const res = await api.requestPost('/register', data);
    dispatch(register(res.data.email));
  } catch (error) {
    dispatch(setError(error.response?.data));
  } finally {
    dispatch(unsetLoader(false));
  }
};

export const loginOperation = data => async dispatch => {
  try {
    dispatch(setLoader(true));

    const res = await api.requestPost('/login', data);
    dispatch(login(res.data.email));
    dispatch(setToken(res.data.token));
    api.setToken(res.data.token);
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setError('неполадки на сервере'));
    }
    dispatch(setError('не верный логин или пароль'));
  } finally {
    dispatch(unsetLoader(false));
  }
};
export const getCurrentUserOperation = () => async (dispatch, getState) => {
  const {
    auth: { token: hasToken },
  } = getState();
  if (!hasToken) {
    return;
  }
  try {
    dispatch(setLoader(true));
    api.setToken(hasToken);
    const res = await api.requestGet('/currentUser');
    dispatch(current(res.data.email));
  } catch (error) {
    if (error.response.status === 401) {
      api.unsetToken();
      dispatch(logout());
      dispatch(unsetToken());

      return;
    }
  } finally {
    dispatch(unsetLoader(false));
  }
};

export const logoutOperation = () => async dispatch => {
  try {
    await api.requestPost('/logout');
    dispatch(logout());
    dispatch(unsetToken());
    api.unsetToken();
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setError('неполадки на сервере'));
    }
  } finally {
  }
};

export const recoverPasswordOperation = data => async dispatch => {
  try {
    await api.requestPost('/recover/password', data);
  } catch (error) {
    if (error.response.status === 500) {
      dispatch(setError('неполадки на сервере'));
    }
  } finally {
  }
};
