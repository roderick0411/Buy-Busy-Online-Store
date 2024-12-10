import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db, { auth } from "../../firebase.config";
import {
  doc,
  collection,
  query,
  getDocs,
  updateDoc,
  where,
  getDoc,
} from "firebase/firestore";
import { toast, Bounce } from "react-toastify";

const initialState = {
  userId: null,
  userDocId: null,
  cart: [],
  orders: [],
  cartLoading: true,
  cartError: null,
  toastMessage: "",
};

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCartAsync",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;
      console.log(user);
      if (!user) {
        console.log("user not logged");
        thunkAPI.dispatch(fetchCartSuccess({ userDocId: null, cart: [] }));
      } else {
        const cartQuery = query(
          collection(db, "Users"),
          where("userId", "==", user.uid)
        );
        await getDocs(cartQuery)
          .then((doc) => {
            const userDocId = doc.docs[0].id;
            const cart = doc.docs[0].data().cart;
            const orders = doc.docs[0].data().orders;
            console.log(cart);
            setTimeout(
              () =>
                thunkAPI.dispatch(
                  fetchCartSuccess({ userDocId, cart, orders })
                ),
              1500
            );
          })
          .catch((err) => thunkAPI.dispatch(fetchCartError()));
      }
    } catch (error) {
      thunkAPI.dispatch(fetchCartError());
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCartAsync",
  async (info, thunkAPI) => {
    try {
      const cartRef = doc(db, "Users", info.userDocId);
      await updateDoc(cartRef, {
        cart: info.cart,
      });
      const docSnap = await getDoc(cartRef);
      thunkAPI.dispatch(
        fetchCartSuccess({
          userDocId: info.userDocId,
          cart: docSnap.data().cart,
          orders: docSnap.data().orders,
          message: info.message,
        })
      );
      if (info.message) {
        console.log("Launching toast");
        toast.success(info.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      console.log("Toast launched");
    } catch (error) {
      thunkAPI.dispatch(fetchCartError());
      toast.error("Something went Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  "cart/createOrderAsync",
  async (info, thunkAPI) => {
    try {
      const cartRef = doc(db, "Users", info.userDocId);
      const order = {
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        items: [...info.cart],
      };
      const sfDoc = await getDoc(cartRef);
      const orders = sfDoc.data().orders;
      await updateDoc(cartRef, {
        cart: [],
        orders: [...orders, order],
      });
      const docSnap = await getDoc(cartRef);
      console.log("Launching toast");
      console.log("Order placed");
      thunkAPI.dispatch(
        fetchCartSuccess({
          userDocId: info.userDocId,
          cart: docSnap.data().cart,
          orders: docSnap.data().orders,
          message: info.message,
        })
      );
      toast.success("Order placed Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      thunkAPI.dispatch(fetchCartError());
      toast.error("Something went Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartStart: (state) => {
      state.cartLoading = true;
    },
    fetchCartSuccess: (state, action) => {
      state.cart = action.payload.cart;
      state.orders = action.payload.orders;
      state.userDocId = action.payload.userDocId;
      state.userId = action.payload.userId;
      state.cartLoading = false;
      state.toastMessage = "";
      if (action.payload.message) {
        state.toastMessage = action.payload.message;
      }
    },
    fetchCartError: (state) => {
      state.cartError = "Failed to fetch Cart";
      state.cartLoading = false;
    },
    logoutUser: (state) => {
      state.cart = [];
      state.orders = null;
      state.userDocId = null;
      state.userId = null;
      state.cartLoading = false;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { fetchCartStart, fetchCartSuccess, fetchCartError, logoutUser } =
  cartSlice.actions;
