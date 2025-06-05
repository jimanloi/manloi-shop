import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductsResponse } from "../types/productTypes";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;
