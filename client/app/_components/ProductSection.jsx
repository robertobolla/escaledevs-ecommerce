"use client";
import ProductList from "./ProductList";
import GlobalApi from "../_utils/GlobalApi";
import { useEffect, useState } from "react";

function ProductSection() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = () => {
    GlobalApi.getLatestProducts().then((resp) => {
      console.log(resp.data.data);
      setProductList(resp.data.data);
    });
  };

  const filterProductList = (category) => {
    const result = productList.filter(
      (item) => item.attributes.category == category
    );
    return result;
  };

  return (
    productList && (
      <div className="px-10 md:px-20 pb-14">
        <h2 className="font-medium text-[20px] my-3">React & Nexts Projects</h2>
        <ProductList productList={filterProductList("react-projects")} />
        <h2 className="font-medium text-[20px] my-3">Plugins Wordpress</h2>
        <ProductList productList={filterProductList("plugins-wordpress")} />
      </div>
    )
  );
}

export default ProductSection;
