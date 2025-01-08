"use client";

import React, { useEffect, useState } from "react";
import ProductList from "@/app/_components/ProductList";
import GlobalApi from "../_utils/GlobalApi";

function Projects() {
  const [productList, setProductList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = () => {
    GlobalApi.getLatestProducts().then((resp) => {
      setProductList(resp.data.data);
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((cat) => cat !== category) // Deselect category
          : [...prev, category] // Select category
    );
  };

  const filterProductList = () => {
    if (selectedCategories.length === 0) {
      return productList; // Show all products if no categories are selected
    }
    return productList.filter((item) =>
      selectedCategories.includes(item.attributes.category)
    );
  };

  // Obtener categorías únicas
  const categories = Array.from(
    new Set(productList.map((item) => item.attributes.category))
  );

  return (
    productList && (
      <div className="px-10 md:px-20">
        {/* Checkbuttons para categorías */}
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

        {/* Lista de productos filtrados */}
        <h2 className="font-medium text-[20px] my-3">Products</h2>
        <ProductList productList={filterProductList()} />
      </div>
    )
  );
}

export default Projects;
