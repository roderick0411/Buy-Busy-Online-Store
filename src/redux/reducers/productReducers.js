import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../firebase.config";
import { collection, query, getDocs } from "firebase/firestore";

const initialState = {
  products: [],
  productsLoading: true,
  productsError: null,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProductsAsync",
  async () => {
    const result = await fetch(
      "http://localhost:4000/api/buybusy/product/products"
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
    return result.products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.products = [];
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsLoading = false;
        state.productsError = null;
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.products = [];
        state.productsLoading = false;
        state.productsError = null;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const { fetchProductsStart, fetchProductsSuccess, fetchProductsError } =
  productsSlice.actions;
