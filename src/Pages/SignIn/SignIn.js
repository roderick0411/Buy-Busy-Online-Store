import AuthForm from "../../StyledComponents/AuthForm";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../../redux/reducers/userReducer";

export default function SignIn() {
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);

  const userData = useSelector((state) => state.userReducer.userData);
  if (userData) {
    console.log("Logged in");
    window.location.pathname = "/";
  }

  return (
    <div className="sign-in-page">
      <AuthForm className="sign-in-form">
        <h2 className="auth-form-title">Sign In</h2>
        <input
          className="auth-form-input"
          type="email"
          placeholder="Enter Email"
          ref={email}
        />
        <input
          className="auth-form-input"
          type="password"
          placeholder="Enter Password"
          ref={password}
        />
        <button
          className="auth-form-button"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              loginUserAsync({
                email: email.current.value,
                password: password.current.value,
              })
            );
          }}
        >
          Sign In
        </button>
        <Link to="/signup">Or Sign Up instead</Link>
      </AuthForm>
    </div>
  );
}
