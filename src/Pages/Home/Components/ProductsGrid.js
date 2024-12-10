import ProductCard from "../../../StyledComponents/ProdutCard";
import { useNavigate } from "react-router-dom";
import { updateCartAsync } from "../../../redux/reducers/cartReducers";
import { useDispatch } from "react-redux";
import { displayPrice, trimString } from "../../../Utils/utilFunctions";
import { getAuthToken } from "../../../Utils/utilFunctions";
import { toast } from "react-toastify";
import { updateCart } from "../../../redux/reducers/userReducer";

export default function ProductsGrid({ products, filters, userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function cartHas(productId) {
    if (!userData) {
      return false;
    }
    return (
      userData.cart.findIndex(
        (product) => product.productId._id.toString() === productId
      ) !== -1
    );
  }

  function cartIndex(productId) {
    return userData.cart.findIndex((product) => product._id === productId);
  }

  const productsFilter = (product) => {
    return (
      product.price <= filters.maxPrice &&
      (filters.categories.size === 0 ||
        product.categories.reduce(
          (acc, curr) => acc || filters.categories.has(curr),
          false
        )) &&
      product.name.toLowerCase().includes(filters.searchField.toLowerCase())
    );
  };

  const toggleCart = async (product) => {
    const token = getAuthToken();
    if (!userData || !token) {
      return navigate("/signin");
    }
    console.log("cartHas: ", cartHas(product._id));
    if (!cartHas(product._id.toString())) {
      const fetchResult = await fetch(
        "http://localhost:4000/api/buybusy/user/addtocart/" + product._id,
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
    } else {
      const fetchResult = await fetch(
        "http://localhost:4000/api/buybusy/user/removefromcart/" + product._id,
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
    }
  };
  return (
    <div className="products-grid">
      {products.filter(productsFilter).map((prod) => (
        <ProductCard key={prod._id}>
          <div className="product-image">
            <img src={prod.image} alt={prod.name} />
          </div>
          <div className="product-details">
            <div className="product-name">
              <p>{trimString(prod.name)}</p>
            </div>
            <div className="product-options">
              <p>&#8377; {displayPrice(prod.price)}</p>
            </div>
            <button
              className={
                cartHas(prod._id.toString())
                  ? "product-btn remove-btn"
                  : "product-btn add-btn"
              }
              onClick={(event) => {
                event.preventDefault();
                toggleCart(prod);
              }}
            >
              {cartHas(prod._id.toString())
                ? "Remove from Cart"
                : "Add to Cart"}
            </button>
          </div>
        </ProductCard>
      ))}
    </div>
  );
}
