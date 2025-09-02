import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import guestReducer from "./features/guestSlice";
import popupMessageSlice from "./features/popupMessageSlice";

const rootReducer = combineReducers({
  guest: guestReducer,
  auth: authReducer,
  popupMessage: popupMessageSlice,
});

export const resetAll = () => {
  const initialState = rootReducer(undefined, { type: "" });
  return {
    type: "RESET_ALL",
    payload: initialState,
  };
};

export default rootReducer;
