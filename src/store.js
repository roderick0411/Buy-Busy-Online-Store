import { configureStore } from "@reduxjs/toolkit";

import { productsReducer } from "./redux/reducers/productReducers";
import { cartReducer } from "./redux/reducers/cartReducers";
import { userReducer } from "./redux/reducers/userReducer";

export const store = configureStore({
  reducer: { productsReducer, userReducer, cartReducer },
});
