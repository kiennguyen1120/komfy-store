import axios from "axios";

const productionUrl =
  process.env.API_BASE_URL ?? "http://localhost:8099/api/v1";

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};
