import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  cards: {
    word: string;
    image: string;
  }[];
} = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (
      state,
      payload: PayloadAction<{ word: string; image: string }[]>
    ) => {
      console.log(payload.payload);
      return {
        ...state,
        cards: payload.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCards } = cardsSlice.actions;

export default cardsSlice.reducer;
