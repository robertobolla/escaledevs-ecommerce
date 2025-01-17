const { default: axios } = require("axios");

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = "https://api.escaledevs.com/api";

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getLatestProducts = () => axiosClient.get("/products?populate=*");

const getProductById = (id) =>
  axiosClient.get("/products/" + id + "?populate=*");

//Get Product List By Category

const getProductByCategory = (category) =>
  axiosClient.get(
    "/products?filters[category][$eq]=" + category + "&populate=*"
  );

//Add to Cart Collection

const addToCart = (data) => axiosClient.post("/carts", data);

//Get User Cart Items

const getUserCartItems = (email) =>
  axiosClient.get(
    "/carts?populate[products][populate][0]=image&filters[email][$eq]=" + email
  );

//Delete Cart Item

const deleteCartItem = (id) => axiosClient.delete("/carts/" + id);

const createOrder = async (data) => {
  if (!data || !data.data) {
    throw new Error("Datos inválidos para crear la orden.");
  }

  try {
    const response = await axiosClient.post("/orders", data);
    console.log("Orden creada exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la orden en Strapi:",
      error.response?.data || error.message
    );
    throw error;
  }
};
// Create order Strapi

const downloadProduct = (productId) =>
  axiosClient.get(`/products/${productId}/download`, {
    responseType: "blob", // Esto asegura que Axios maneje la respuesta como un archivo
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getLatestProducts,
  getProductById,
  getProductByCategory,
  addToCart,
  getUserCartItems,
  deleteCartItem,
  createOrder,
  downloadProduct,
};
