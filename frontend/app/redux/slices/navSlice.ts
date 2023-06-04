import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Modes, CardSelectionOptions } from "../../types/index";
import cardSelectionOptions from "@/app/components/CardSelectionOptions/CardSelectionOptions";

const initialState: {
  cardSelection: CardSelectionOptions;
} = {
  cardSelection: "recommended",
};

export const navSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
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
export const { setCardSelectionMode } = navSlice.actions;

export default navSlice.reducer;
