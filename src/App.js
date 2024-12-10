import { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Cart from "./Pages/Cart/Cart";
import MyOrders from "./Pages/Orders/MyOrders";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthTokenAsync } from "./redux/reducers/userReducer";
import { fetchProductsAsync } from "./redux/reducers/productReducers";

import { getAuthToken } from "./Utils/utilFunctions";

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(fetchProductsAsync());
    const token = getAuthToken();
    if (!token) {
      return;
    }
    dispatch(checkAuthTokenAsync(token));
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    return !userData ? <Navigate to="/" /> : children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar userData={userData} />,
      children: [
        { index: true, element: <Home /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "myorders",
          element: (
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
