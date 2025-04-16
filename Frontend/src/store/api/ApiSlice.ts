import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  credentials:"include", // sent cookie with every request to server
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Auth", "User", "Session"],
  endpoints: () => ({}),
});
