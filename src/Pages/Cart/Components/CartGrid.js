import ProductCard from "../../../StyledComponents/ProdutCard";
import { displayPrice, trimString } from "../../../Utils/utilFunctions";
import { useSelector, useDispatch } from "react-redux";
import { GridLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getAuthToken } from "../../../Utils/utilFunctions";
import { useNavigate } from "react-router-dom";
import { updateCart } from "../../../redux/reducers/userReducer";

export default function CartGrid() {
  const { userData } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromCart = async (productId) => {
    const token = getAuthToken();
    if (!token) {
      return navigate("/signin");
    }
    const fetchResult = await fetch(
      "http://localhost:4000/api/buybusy/user/removefromcart/" + productId,
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
  };

  const incrementQuantity = async (productId) => {
    const token = getAuthToken();
    if (!token) {
      return navigate("/signin");
    }
    const fetchResult = await fetch(
      "http://localhost:4000/api/buybusy/user/incrementquantity/" + productId,
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
  };

  const decrementQuantity = async (productId) => {
    const token = getAuthToken();
    if (!token) {
      return navigate("/signin");
    }
    const fetchResult = await fetch(
      "http://localhost:4000/api/buybusy/user/decrementquantity/" + productId,
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
  };

  return !userData ? (
    <GridLoader className="grid-loader" color="#7064e5" />
  ) : (
    <div className="cart-grid">
      {userData.cart.map((prod) => (
        <ProductCard key={prod.productId._id}>
          <div className="product-image">
            <img src={prod.productId.image} alt={prod.productId.name} />
          </div>
          <div className="product-details">
            <div className="product-name">
              <p>{trimString(prod.productId.name)}</p>
            </div>
            <div className="product-options">
              <p>&#8377; {displayPrice(prod.productId.price)}</p>
              <div className="quantity-container">
                <img
                  onClick={() =>
                    decrementQuantity(prod.productId._id.toString())
                  }
                  src="./Icons/subtract.png"
                  alt="decrement"
                />
                {prod.quantity}
                <img
                  onClick={() =>
                    incrementQuantity(prod.productId._id.toString())
                  }
                  src="./Icons/add.png"
                  alt="increment"
                />
              </div>
            </div>
            <button
              className="product-btn remove-btn"
              onClick={(event) => {
                event.preventDefault();
                // removeFromCart(prod.id);
              }}
            >
              Remove from Cart
            </button>
          </div>
        </ProductCard>
      ))}
    </div>
  );
}
