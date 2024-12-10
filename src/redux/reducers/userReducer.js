import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

export const checkAuthTokenAsync = createAsyncThunk(
  "user/checkAuth",
  async (token) => {
    const result = await fetch(
      "http://localhost:4000/api/buybusy/user/checkAuth",
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
    return result;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const result = await fetch("http://localhost:4000/api/buybusy/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      });
    return result;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      localStorage.removeItem("buyBusyToken");
      state.userData = null;
    },
    updateCart: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.userData = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        localStorage.setItem("buyBusyToken", action.payload.token);
        state.userData = action.payload.user;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.userData = null;
      })
      .addCase(checkAuthTokenAsync.pending, (state) => {
        state.userData = null;
      })
      .addCase(checkAuthTokenAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userData = action.payload.user;
      })
      .addCase(checkAuthTokenAsync.rejected, (state) => {
        state.userData = null;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logout, updateCart } = userSlice.actions;
