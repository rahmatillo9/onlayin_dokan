import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const Sort = ({ setSortedProduct, products }) => {
  const [ctg, setCtg] = useState("all");
  const [searchValue, setSearchValue] = useState(""); // Search uchun holat
  const { data: categories, error, loading } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  useEffect(() => {
    if (ctg === "all") {
      if (products) {
        let filteredProducts = products;
        if (searchValue) {
          const key = new RegExp(searchValue, "gi");
          filteredProducts = products.filter((d) => d.title.match(key));
        }
        setSortedProduct(filteredProducts); // Filtrlangan mahsulotlarni yangilash
      } else {
        setSortedProduct(null);
      }
    } else {
      const fetchCategoryProducts = async () => {
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${ctg}`
          );
          if (!response.ok) throw new Error("Failed to fetch category data");
          let categoryData = await response.json();
          if (searchValue) {
            const key = new RegExp(searchValue, "gi");
            categoryData = categoryData.filter((d) => d.title.match(key));
          }
          setSortedProduct(categoryData);
        } catch (err) {
          console.error(err);
          setSortedProduct([]);
        }
      };
      fetchCategoryProducts();
    }
  }, [ctg, searchValue, products, setSortedProduct]);

  return (
    <div className="flex flex-col justify-center items-center py-10 gap-8">
      {/* Search Bar */}
      <form
        className="w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault(); // Form yuborilishini to'xtatish
          if (products) {
            const key = new RegExp(searchValue, "gi");
            const filteredProducts = products.filter((d) =>
              d.title.match(key)
            );
            setSortedProduct(filteredProducts);
          }
        }}
      >
        <div className="relative">
          <input
            type="search"
            id="default-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // Search qiymatini yangilash
            placeholder="Search products..."
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Dropdown */}
      <div className="w-full max-w-md">
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Filter by Category
        </label>
        <select
          id="categories"
          value={ctg}
          onChange={(e) => setCtg(e.target.value)} // Kategoriya qiymatini yangilash
          className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {loading && <option disabled>Loading categories...</option>}
          {error && <option disabled>Error loading categories</option>}
          {categories &&
            categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Sort;
