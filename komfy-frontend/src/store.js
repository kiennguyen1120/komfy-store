import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    //cartState dc quan li boi cartReducer aka cartSlice
    cartState: cartReducer,
    userState: userReducer,
  },
});
