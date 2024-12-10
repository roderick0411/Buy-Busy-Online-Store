import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/userReducer";

export default function Navbar({ userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOutUser = () => {
    dispatch(logout());
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-container">
            <Link className="navbar-logo" to="/">
              Busy Buy
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link className="nav-links" to="/">
                  <span>
                    <img
                      className="icon_styles"
                      src="./Icons/home.png"
                      alt=""
                    />
                  </span>
                  Home
                </Link>
              </li>
              {userData ? (
                <li className="nav-item">
                  <Link className="nav-links" to="/myorders">
                    <span>
                      <img
                        className="icon_styles"
                        src="./Icons/orders.png"
                        alt=""
                      />
                    </span>
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
              {userData ? (
                <li className="nav-item">
                  <Link className="nav-links" to="/cart">
                    <span>
                      <img
                        className="icon_styles"
                        src="./Icons/cart.png"
                        alt=""
                      />
                    </span>
                    Cart
                  </Link>
                </li>
              ) : (
                ""
              )}

              {userData ? (
                <li className="nav-item">
                  <Link onClick={signOutUser} className="nav-links" to="/">
                    <span>
                      <img
                        className="icon_styles"
                        src="./Icons/logout.png"
                        alt=""
                      />
                    </span>
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-links" to="/signin">
                    <span>
                      <img
                        className="icon_styles"
                        src="./Icons/login.png"
                        alt=""
                      />
                    </span>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <ToastContainer />
      <Outlet context={{ userData }} />
    </>
  );
}
