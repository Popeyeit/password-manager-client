import { createSlice } from '@reduxjs/toolkit';
const initialState = '';
const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (_, { payload }) => payload,
  },
});
const { actions, reducer } = filter;
export const { setFilter } = actions;
export default reducer;
