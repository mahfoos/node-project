const axios = require("axios");
const config = require("../config/config");

const axiosInstance = axios.create({
  baseURL: config.EXTERNAL_API_URL,
});

async function getProduct(id) {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function searchProducts(query) {
  try {
    const response = await axiosInstance.get(`/products?q=${query}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getProduct,
  searchProducts,
};
