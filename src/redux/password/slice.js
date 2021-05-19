import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    get: (_, { payload }) => payload,
    create: (state, { payload }) => [...state, payload],
    deleteItem: (state, { payload }) =>
      state.filter(pasItem => pasItem.id !== payload),
    change: (state, { payload }) =>
      state.map(pas => {
        return pas.id === payload.id ? { ...pas, ...payload } : pas;
      }),
  },
});

const { actions, reducer } = passwordSlice;

export const { get, create, deleteItem, change } = actions;

export default reducer;
