import Aside from "../../../StyledComponents/Aside";
import { displayPrice } from "../../../Utils/utilFunctions";

export default function SearchFilter({ filters, setFilters }) {
  const handleCategories = (e, category) => {
    if (e.target.checked) {
      setFilters({
        ...filters,
        categories: filters.categories.add(category),
      });
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.difference(new Set([category])),
      });
    }
  };
  return (
    <Aside>
      <h2>Filter</h2>
      <form>
        <label htmlFor="price">
          Max Price: &#8377; {displayPrice(filters.maxPrice)}
        </label>
        <input
          className="price-range"
          type="range"
          id="price"
          name="price"
          min={0}
          max={100000}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => {
            console.log(e.target.value);
            setFilters({ ...filters, maxPrice: e.target.value });
          }}
        />
        <h2>Category</h2>
        <div className="checkbox-filters">
          <div>
            <input
              onChange={(e) => {
                handleCategories(e, "Men's Clothing");
              }}
              type="checkbox"
              id="mensFashion"
              name="mensFashion"
            />
            <label htmlFor="mensFashion">Men's Clothing</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleCategories(e, "Electronics");
              }}
              type="checkbox"
              id="electronics"
              name="electronics"
            />
            <label htmlFor="electronics">Electronics</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleCategories(e, "Music Instruments");
              }}
              type="checkbox"
              id="musicalInstruments"
              name="musicalInstruments"
            />
            <label htmlFor="musicalInstruments">Music Instruments</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                handleCategories(e, "Toys");
              }}
              type="checkbox"
              id="toys"
              name="toys"
            />
            <label htmlFor="toys">Toys</label>
          </div>
        </div>
      </form>
    </Aside>
  );
}
