"use client";

import {
  useGetAllBrandQuery,
  useGetAllCategoryQuery,
  useGetAllProductsQuery,
} from "@/service/ecommerce";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Filters } from "@/lib/types/product";

export default function ProductList() {
  const [filters, setFilters] = useState<Filters>({})

  const { data, isFetching, error } = useGetAllProductsQuery({});
  const { data: categories } = useGetAllCategoryQuery();
  const { data: brands } = useGetAllBrandQuery();

  const filteredProducts = data?.content?.filter((product: any) => {
  const matchCategory = filters.categoryUuid ? product.category?.uuid === filters.categoryUuid : true;
  const matchBrand = filters.brandUuid ? product.brand?.uuid === filters.brandUuid : true;
  return matchCategory && matchBrand;
});

const handleFilter = (key: keyof Filters, value: string) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value || undefined,
  }));
};

  if (error) {
    return <div className="flex justify-center items-center py-20 text-red-500">Failed to load products</div>;
  }

  return (
    <div className="px-6 py-10">
      <select value={filters.categoryUuid ?? ""} onChange={(e) => handleFilter("categoryUuid", e.target.value)}>
        <option value="">All Categories</option>
        {categories?.content?.map((category) => (
          <option key={category.uuid} value={category.uuid}>{category.name}</option>
        ))}
      </select>

      <select value={filters.brandUuid ?? ""} onChange={(e) => handleFilter("brandUuid", e.target.value)} 
      className="border rounded p-2">
        <option value="">All Brands</option>
        {brands?.content?.map((item) => (
          <option value={item.uuid} key={item.uuid}>{item.name}</option>
        ))}
      </select>

      {isFetching ? (
        <div className="flex justify-center items-center py-20 text-gray-500">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
            <Link key={product.uuid} href={`/productlist/${product.uuid}`}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
                <div className="relative w-full h-48 bg-gray-100">
                  <Image src={product?.thumbnail} alt={product?.name} fill className="object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product?.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product?.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-blue-600 font-bold text-lg">${product?.priceOut}</p>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Buy</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}