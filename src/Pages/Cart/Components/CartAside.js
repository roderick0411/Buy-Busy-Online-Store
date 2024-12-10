import Aside from "../../../StyledComponents/Aside";
import { displayPrice } from "../../../Utils/utilFunctions";
import { useSelector, useDispatch } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { getAuthToken } from "../../../Utils/utilFunctions";
import { useNavigate } from "react-router-dom";
import { updateCart } from "../../../redux/reducers/userReducer";

export default function CartAside() {
  const { userData } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createOrder = async () => {
    if (userData.cart.length === 0) {
      return toast.error("The Cart is empty", {
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
    const token = getAuthToken();
    if (!userData || !token) {
      return navigate("/signin");
    }
    const fetchResult = await fetch(
      "http://localhost:4000/api/buybusy/user/placeorder",
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }
    );
    if (fetchResult.status === 401) {
      toast.info("Login to continue");
      return navigate("/signin");
    }
    const result = await fetchResult.json();
    console.log(result.user);
    dispatch(updateCart(result.user));
    toast.success("Order placed");
  };
  const getTotalPrice = () => {
    return userData.cart.reduce(
      (acc, curr) => acc + curr.productId.price * curr.quantity,
      0
    );
  };
  return (
    <Aside className="cart-aside">
      <p>Total Price: &#8377; {displayPrice(getTotalPrice())} </p>
      <button onClick={createOrder}>Purchase</button>
    </Aside>
  );
}
