import ky from "ky";
import { type Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  return ky
    .get("https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json")
    .json<Product[]>();
};