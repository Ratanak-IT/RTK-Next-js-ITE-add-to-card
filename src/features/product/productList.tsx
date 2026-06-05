"use client";

import { useGetAllProductsQuery } from "@/service/ecommerce";
import Image from "next/image";


export default function ProductList() {
  const { data, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.content?.map((product) => (
          <div
            key={product?.uuid}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={product?.thumbnail}
                alt={product?.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {product?.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product?.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-blue-600 font-bold text-lg">
                  ${product?.priceOut}
                </p>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}