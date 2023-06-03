import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import cardsReducer from "./slices/cardsSlice";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

const store = configureStore({
  reducer: {
    navigation: navReducer,
    cards: cardsReducer,
  },
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
