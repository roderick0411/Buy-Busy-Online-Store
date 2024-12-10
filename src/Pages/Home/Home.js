import ProductsGrid from "./Components/ProductsGrid";
import SearchFilter from "./Components/SearchFilter";
import SearchForm from "../../StyledComponents/SearchBar";

import { useState } from "react";
import { useSelector } from "react-redux";

import { GridLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [filters, setFilters] = useState({
    searchField: "",
    maxPrice: 40000,
    categories: new Set(),
  });

  const { products, productsLoading, productsError } = useSelector((state) => {
    return state.productsReducer;
  });
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <div className="home-page">
      <SearchFilter filters={filters} setFilters={setFilters} />
      <SearchForm>
        <input
          className="search-input"
          type="search"
          placeholder="Search By Name"
          value={filters.searchField}
          onChange={(e) =>
            setFilters({ ...filters, searchField: e.target.value })
          }
        />
      </SearchForm>
      {/* <ToastContainer /> */}
      {productsLoading ? (
        <GridLoader className="grid-loader" color="#7064e5" />
      ) : (
        <ProductsGrid
          products={products}
          filters={filters}
          userData={userData}
        />
      )}
    </div>
  );
}
