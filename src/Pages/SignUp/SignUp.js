import AuthForm from "../../StyledComponents/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function createUser(name, email, password, navigate) {
  console.log({ name, email, password });
  fetch("http://localhost:4000/api/buybusy/user/signup", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
}

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="sign-up-page">
      <AuthForm className="sign-in-form">
        <h2 className="auth-form-title">Sign Up</h2>
        <input
          className="auth-form-input"
          type="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="auth-form-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth-form-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="auth-form-button"
          onClick={(e) => {
            e.preventDefault();
            createUser(name, email, password, navigate);
          }}
        >
          Sign Up
        </button>
      </AuthForm>
    </div>
  );
}
