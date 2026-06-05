"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../lib/features/cartSlice/cartSlice";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded-lg">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="h-40"
      />

      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>${product.price}</p>

      <button
    
        className="bg-blue-500 cursor-pointer text-white px-3 py-1 mt-2 rounded"
        onClick={() =>
          dispatch(addToCart({ ...product, quantity: 1 }))
        }
      >
        Add to Cart
      </button>
    </div>
  );
}