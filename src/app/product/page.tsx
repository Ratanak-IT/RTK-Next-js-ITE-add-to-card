"use client";
import ProductCard from "@/components/productCard/ProductCard";
import { products } from "@/data/products";

export default function ProductPage() {
  return (
    <>
      {
        <div className="grid grid-cols-4 gap-4 p-5">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      }
    </>
  );
}
