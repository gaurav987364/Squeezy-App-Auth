/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";


const rawBaseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  credentials:"include", // sent cookie with every request to server
  // prepareHeaders: (headers) => {
  //   console.log('Sending request with headers:', headers);
  //   return headers;
  // },
});

// let isRefreshing = false;
// const queue: Array<() => void> = [];

// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   // Initial request
//   let result = await rawBaseQuery(args, api, extraOptions);
  
//   // Handle 401 errors
//   if (result.error?.status === 401) {
//     if (!isRefreshing) {
//       isRefreshing = true;
      
//       try {
//         // Attempt token refresh
//         const refreshResult = await rawBaseQuery(
//           { url: '/api/auth/refresh', method: 'GET' },
//           api,
//           extraOptions
//         );

//         if (refreshResult.data) {
//           // Update auth state with new credentials
//           api.dispatch(setCredentials({...refreshResult}));
          
//           // Retry original request with new token
//           result = await rawBaseQuery(args, api, extraOptions);
//         } else {
//           throw new Error('Refresh failed');
//         }
//       } catch (error) {
//         // Only logout if refresh fails
//         api.dispatch(logout());
//       } finally {
//         isRefreshing = false;
//         // Process queued requests
//         queue.forEach(cb => cb());
//         queue.length = 0;
//       }
//     } else {
//       // Queue request while refreshing
//       await new Promise<void>((resolve) => {
//         queue.push(() => resolve());
//       });
//       result = await rawBaseQuery(args, api, extraOptions);
//     }
//   }
  
//   return result;
// };
export const apiSlice = createApi({
  baseQuery:rawBaseQuery,
  tagTypes: ["Auth", "User", "Session"],
  endpoints: () => ({}),
  refetchOnFocus:true,
  refetchOnReconnect:true
});
