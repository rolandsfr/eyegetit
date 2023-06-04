import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Modes, CardSelectionOptions } from "../../types/index";
import cardSelectionOptions from "@/app/components/CardSelectionOptions/CardSelectionOptions";

const initialState: {
  mode: Modes;
  cardSelection: CardSelectionOptions;
} = {
  mode: "listening",
  cardSelection: "recommended",
};

export const navSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ location: Modes }>) => {
      return {
        ...state,
        mode: action.payload.location,
      };
    },
    setCardSelectionMode: (
      state,
      action: PayloadAction<CardSelectionOptions>
    ) => {
      return {
        ...state,
        cardSelection: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocation, setCardSelectionMode } = navSlice.actions;

export default navSlice.reducer;
