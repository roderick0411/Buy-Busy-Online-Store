import { useEffect, useState } from "react";
import OrdersFlex from "./Components/OrdersFlex";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";
import db from "../../firebase.config";
import { query, collection, where, getDocs } from "firebase/firestore";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function MyOrders() {
  // const [userId, setUserId] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [orders, setOrders] = useState([]);
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <div className="orders-page">
      <ToastContainer />
      {!userData ? (
        <GridLoader className="grid-loader" color="#7064e5" />
      ) : (
        <OrdersFlex orders={userData.orders} />
      )}
    </div>
  );
}
