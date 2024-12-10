import styled from "styled-components";

const Aside = styled.aside`
  background: #f0f0fc;
  border-radius: 10px;
  left: 0;
  padding: 1rem;
  position: fixed;
  text-align: center;
  top: 30%;
  width: 14rem;
  & h2 {
    display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    color: #224957;
    font-size: 1.25em;
    font-weight: 700;
  }
  & form {
    display: block;
    margin-top: 0em;
    unicode-bidi: isolate;
    & input.price-range {
      background-color: #7064e5;
      border-radius: 4px;
      cursor: pointer;
      height: 6px;
      -webkit-transform: scale(1);
      transform: scale(1);
      width: 90%;
    }
    & .checkbox-filters {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: center;
    }
  }
  p {
    color: #224957;
    font-size: 1.15em;
    font-weight: 700;
  }
  button {
    background: #7064e5;
    border: 1px solid #7064e5;
    border-radius: 6px;
    color: #fff;
    font-size: 20px;
    margin: auto;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
`;

export default Aside;
