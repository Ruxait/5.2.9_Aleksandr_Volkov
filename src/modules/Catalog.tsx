import { useEffect, useState } from "react";
import { Title, Container } from "@mantine/core";
import { getProducts } from "../api/products";
import { type Product } from "../types/product";
import { ProductGrid } from "../components/ProductGrid";

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container size="xl" py="lg" style={{ backgroundColor: "#f4f6fa" }}>
      <Title order={2} mb="md">
        Catalog
      </Title>
      <ProductGrid products={products} isLoading={loading} />
    </Container>
  );
};