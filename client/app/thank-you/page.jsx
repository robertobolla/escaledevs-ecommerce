"use client";

import { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";

const ThankYou = () => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    // Obtener los productos comprados desde sessionStorage
    const products = JSON.parse(sessionStorage.getItem("purchasedProducts"));
    if (products) {
      setPurchasedProducts(products);
    }
  }, []);

  const handleDownload = async (productId) => {
    try {
      const response = await GlobalApi.downloadProduct(productId); // Nueva función en GlobalApi
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "archivo.zip"); // Cambia el nombre según el archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el producto:", error);
      alert("Hubo un error al intentar descargar el archivo.");
    }
  };

  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-3xl font-bold text-gray-800">
        ¡Gracias por tu compra!
      </h1>
      <p className="text-gray-600 mt-4">
        Puedes descargar los archivos de tus productos comprados a continuación:
      </p>
      <div className="mt-8">
        {purchasedProducts.length > 0 ? (
          purchasedProducts.map((product) => (
            <div key={product.id} className="mb-4">
              <h2 className="text-lg font-semibold">
                {product.attributes.title}
              </h2>
              <button
                onClick={() => handleDownload(product.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Descargar {product.attributes.title}
              </button>
            </div>
          ))
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ThankYou;
