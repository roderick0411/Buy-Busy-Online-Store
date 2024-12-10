import styled from "styled-components";

const ProductCard = styled.div`
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(64, 77, 148, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  transition: all 0.25s ease-in-out;
  & .product-image {
    flex: 1 1;
    & img {
      max-width: 10rem;
    }
  }
  & .product-details {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    & .product-name {
      color: #224957;
      font-family: Inter, sans-serif;
      font-size: 1.25rem;
      font-weight: 500;
      padding: 8px 0;
      & p {
        margin: 0;
      }
    }
    & .product-options {
      align-items: center;
      display: flex;
      font-size: 24px;
      justify-content: space-between;
      padding: 8px 0;
      width: 100%;
      & p {
        color: #224957;
        font-weight: 700;
        margin: 0;
      }
      & .quantity-container {
        align-items: center;
        display: flex;
        justify-content: space-evenly;
        width: 50%;
        & img {
          transition: all 0.1s ease-in-out;
          &:hover {
            cursor: pointer;
            -webkit-transform: scale(1.15);
            transform: scale(1.15);
          }
        }
      }
    }
    & .product-btn {
      color: #fff;
      font-size: 20px;
      padding: 0.75rem 0;
      transition: all 0.3s ease-in-out;
      width: 50%;
      width: 100%;
      cursor: pointer;
    }
    & .add-btn {
      background: #7064e5;
      border: 1px solid #7064e5;
      border-radius: 6px;
      &:hover {
        background-color: initial;
        border: 1px solid #7064e5;
        color: #7064e5;
        cursor: pointer;
      }
    }
    & .remove-btn {
      background: #f14444;
      border: 1px solid red;
      border-radius: 6px;
      &:hover {
        background-color: initial;
        border: 1px solid #f14444;
        color: #f14444;
        cursor: pointer;
      }
    }
  }
`;

export default ProductCard;
