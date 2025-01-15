"use client";

import React, { useEffect, useState } from "react";
import ProductList from "@/app/_components/ProductList";
import GlobalApi from "../_utils/GlobalApi";

export const dynamic = "force-dynamic";

function Projects() {
  const [productList, setProductList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = () => {
    GlobalApi.getLatestProducts()
      .then((resp) => {
        setProductList(resp.data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const filterProductList = () => {
    if (selectedCategories.length === 0) {
      return productList;
    }
    return productList.filter((item) =>
      selectedCategories.includes(item.attributes.category)
    );
  };

  const categories = Array.from(
    new Set(productList.map((item) => item.attributes.category))
  );

  return (
    <div className="px-10 md:px-20">
      {/* Filter by Category */}
      <h2 className="font-medium text-[20px] my-3">Filter by Category</h2>
      <div className="flex flex-wrap gap-4 mb-5">
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Product List */}
      <h2 className="font-medium text-[20px] my-3">Products</h2>
      <ProductList productList={filterProductList()} />
    </div>
  );
}

export default Projects;
