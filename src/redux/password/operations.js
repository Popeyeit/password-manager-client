import api from '../../api/api';
import { get, create, change, deleteItem } from './slice';
import { setLoader, unsetLoader } from '../loader/slice';
import { setError, unsetError } from '../error/slice';

export const getPasswordsOperation = () => async (dispatch, getState) => {
  const {
    auth: { token: hasToken },
  } = getState();
  if (!hasToken) {
    return;
  }
  try {
    dispatch(unsetError(null));
    dispatch(setLoader(true));
    api.setToken(hasToken);
    const res = await api.requestGet('/password');
    dispatch(get(res.data));
  } catch (error) {
    if (error.response?.data) {
      dispatch(setError(error.response.data));
      return;
    }
    dispatch(setError('server is down'));
  } finally {
    dispatch(unsetLoader(false));
  }
};

export const createPasswordOperation = item => async dispatch => {
  try {
    const res = await api.requestPost('/password', item);
    dispatch(create(res.data));
  } catch (error) {
    if (error.response?.data) {
      dispatch(setError(error.response.data));
      return;
    }
    dispatch(setError('server is down'));
  } finally {
  }
};

export const deletePasswordOperation = id => async dispatch => {
  try {
    await api.deleteItem(`/password/${id}`);
    dispatch(deleteItem(id));
  } catch (error) {
    if (error.response?.data) {
      dispatch(setError(error.response.data));
      return;
    }
    dispatch(setError('server is down'));
  } finally {
  }
};

export const changePasswordOperation = (id, body) => async dispatch => {
  try {
    const res = await api.changeItem(`/password/${id}`, body);

    dispatch(change(res.data));
  } catch (error) {
    if (error.response?.data) {
      dispatch(setError(error.response.data));
      return;
    }
    dispatch(setError('server is down'));
  } finally {
  }
};
