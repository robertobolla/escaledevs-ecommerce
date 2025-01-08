import ProductItem from "./ProductItem";

function ProductList({ productList }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {productList.map((item, index) => (
        <div key={index}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
