import { createSlice } from "@reduxjs/toolkit";

interface GuestState {
  loading: boolean;
  email: string | null;
  resetToken: string | null;
  otp: number | null;
}

const initialState: GuestState = {
  loading: true,
  email: null,
  resetToken: null,
  otp: null,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
      state.loading = false;
    },
    setResetToken: (state, action) => {
      state.resetToken = action.payload;
      state.loading = false;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
      state.loading = false;
    },
    removeGuest: (state) => {
      state.otp = null;
      state.email = null;
      state.resetToken = null;
      state.loading = false;
    },
    resetGuest: () => {
      return initialState;
    },
  },
});

export const { setEmail, setResetToken, setOtp, removeGuest, resetGuest } =
  guestSlice.actions;
export default guestSlice.reducer;
