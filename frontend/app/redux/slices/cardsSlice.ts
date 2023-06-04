import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  cards: {
    word: string;
    image: string;
  }[];
  query: string | null;
} = {
  cards: [],
  query: null,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (
      state,
      action: PayloadAction<{ word: string; image: string }[]>
    ) => {
      return {
        ...state,
        cards: action.payload,
      };
    },
    setQuery: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCards, setQuery } = cardsSlice.actions;

export default cardsSlice.reducer;
