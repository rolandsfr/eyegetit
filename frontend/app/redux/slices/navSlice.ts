import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Modes } from "../../types/index";

const initialState: {
  mode: Modes;
} = {
  mode: "listening",
};

export const navSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setLocation: (state, payload: PayloadAction<{ location: Modes }>) => {
      state = {
        ...state,
        mode: payload.payload.location,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocation } = navSlice.actions;

export default navSlice.reducer;
