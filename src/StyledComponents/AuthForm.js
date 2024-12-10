import styled from "styled-components";

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 20rem;
  & h2.auth-form-title {
    color: #224957;
    font-size: 2.75em;
    font-weight: 900;
    text-align: left;
  }
  & input.auth-form-input {
    background: #f4f6f8;
    border: 1px solid #7064e5;
    border-radius: 10px;
    box-sizing: border-box;
    color: #7064e5;
    font-size: 1.2em;
    padding: 12px;
  }
  & button.auth-form-button {
    background: #7064e5;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 1.2em !important;
    padding: 0.4em !important;
    width: 100%;
    cursor: pointer;
  }
`;

export default AuthForm;
