


import { CreateProductType, ProductType } from "@/lib/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL
    }),

    endpoints: (builder) => ({
    getAllProducts: builder.query<ProductType[], void>({
        query: () => "/products",
    }),
    getProductByUuid: builder.query<ProductType, string>({
        query: (uuid: string) => `/products/${uuid}`,
    }),
    createProduct: builder.mutation<CreateProductType, CreateProductType>({
        query: (newProduct: CreateProductType) => ({
            url: "/products",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            },
            body: newProduct,
        }),
    }),

  }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByUuidQuery,
    useCreateProductMutation
} = ecommerceApi;