import { BrandResponse } from "@/lib/types/brand";
import { CategoryItem, CategoryResponse } from "@/lib/types/category";
import { FilterType, ProductFilter, ProductResponse, ProductType } from "@/lib/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi", //ឈ្មោះសម្គាល់របស់ API នៅក្នុង Redux Store
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // រាល់ពេល Call ទៅណា វានឹងចាប់ផ្តើមពី /api ជានិច្ច (/api/products)
  }),

  /**
   * endpoints ចំណុចតភ្ជាប់ API
   * endpoints have 2
   * 1. builder.query for get data
   * 2. builder.mutation for CUD (create,update, delete) data
   */
  endpoints: (builder) => ({
    //ទិន្នន័យដែលទទួលបាន (Response) គឺជា Array នៃ ProductType ហើយវា no need Parameter(void)
    getAllProducts: builder.query<ProductResponse, ProductFilter>({
      query: (filter) => (
        {
        
        url: "/products",
        params: filter,
      }), //វានិងទៅចាប់ path /api/products
      serializeQueryArgs: ({queryArgs}) => {
        return JSON.stringify(queryArgs);
      }
    }),

    getAllCategory: builder.query<CategoryResponse, void>({
      query: () => "/categories",
    }),

    getAllBrand: builder.query<BrandResponse, void>({
      query: () => "/brands",
    }),

    getProductByUuid: builder.query<ProductType, string>({
      query: (uuid) => `/products/${uuid}`, //វានិងទៅចាប់ path /api/products/{uuid}
    }),

    createProduct: builder.mutation<ProductResponse, ProductResponse>({
      query: (newProduct: ProductResponse) => ({
        url: "/products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        body: newProduct,
      }),
    }),
  }),
});

//RTK auto create hook it will return data, isLoading, isError no need to use useEffect
export const {
  useGetAllProductsQuery,
  useGetAllCategoryQuery,
  useGetAllBrandQuery,
  useGetProductByUuidQuery,
  useCreateProductMutation,
} = ecommerceApi;
