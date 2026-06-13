"use client";

import { useGetProductByUuidQuery } from "@/service/ecommerce";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const uuid = params?.uuid as string;
  const { data, isLoading, error } = useGetProductByUuidQuery(uuid);
  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.log("ERROR:", error);
    return <p>Error loading product</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8">
       <Link href="/productlist" className="absolute top-25">🦞  Back</Link>
        <div className="flex justify-center items-center bg-gray-100 rounded-xl p-6">
          <Image
            src={data?.thumbnail || ""}
            alt={data?.name || "Product"}
            width={500}
            height={500}
            className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="inline-block w-fit bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            In Stock
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {data?.name}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            {data?.description}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">
              ${data?.priceOut}
            </span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm font-semibold">
              {data?.discount}% OFF
            </span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="font-medium">Quantity:</span>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-20 border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Add to Cart
            </button>

            <button className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
              Buy Now
            </button>
          </div>

          <div className="mt-8 border-t pt-6 space-y-2 text-sm text-gray-500">
            <p>🚚 Free shipping on orders over $50</p>
            <p>🔒 Secure payment</p>
            <p>↩️ 7-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
