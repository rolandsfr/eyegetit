import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import cardsSlice from "./slices/cardsSlice";

const store = configureStore({
  reducer: {
    navigation: navReducer,
    cards: cardsSlice,
  },
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
