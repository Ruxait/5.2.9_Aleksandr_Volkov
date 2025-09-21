import { SimpleGrid } from "@mantine/core";
import { ProductCard } from "./ProductCard";
import { type Product } from "../types/product";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  const skeletonCount = products.length > 0 ? products.length : 8;
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, idx) => (
            <ProductCardSkeleton key={idx}/>
          ))
        : products.map((p) => <ProductCard key={p.id} product={p} />)}
    </SimpleGrid>
  );
};