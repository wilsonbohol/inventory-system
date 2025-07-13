import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      {
        state.loading = action.payload;
      }
    },
  },
});

export const { setUserDetails, setUserLoading } = userSlice.actions;

export default userSlice.reducer;
