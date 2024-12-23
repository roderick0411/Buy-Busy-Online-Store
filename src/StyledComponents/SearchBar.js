import styled from "styled-components";

const SearchForm = styled.form`
  margin: auto;
  width: 25%;
  & input.search-input {
    background: #f4f6f8 !important;
    border: 1px solid #7064e5;
    border-radius: 10px;
    box-sizing: border-box;
    color: #7064e5 !important;
    font-size: 1.2em;
    font-weight: 400;
    line-height: 1.5;
    margin: 1em 0 !important;
    outline: none;
    padding: 12px;
    width: 100%;
  }
`;

export default SearchForm;
