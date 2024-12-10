import "react-toastify/dist/ReactToastify.css";
import CartAside from "./Components/CartAside";
import CartGrid from "./Components/CartGrid";

export default function Cart() {
  return (
    <div className="cart-page">
      {/* <ToastContainer /> */}
      <CartAside />
      <CartGrid />
    </div>
  );
}
