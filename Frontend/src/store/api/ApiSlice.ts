/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { logout, setCredentials } from "../slices/AuthSlice";


const rawBaseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  credentials:"include", // sent cookie with every request to server
});

let isRefreshing = false;

// ApiSlice.ts
let pendingRequests: (() => void)[] = [];

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // Check token expiration proactively
  const expiryTime = parseInt(localStorage.getItem('expiryTime') || '0', 10);
  const currentTime = Date.now();
  const buffer = 1 * 60 * 1000; // 1 minute buffer

  // Proactive refresh check
  if (!isRefreshing && expiryTime && currentTime >= expiryTime - buffer) {
    isRefreshing = true;
    try {
      const refreshResult = await rawBaseQuery(
        { url: '/api/auth/refresh', method: 'GET' },
        api,
        extraOptions
      );
      
      if (refreshResult.data) {
        api.dispatch(setCredentials(refreshResult.data));
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      api.dispatch(logout());
      return { error: { status: 401, data: 'Session expired' } };
    } finally {
      isRefreshing = false;
      pendingRequests.forEach(cb => cb());
      pendingRequests = [];
    }
  }

  // Make initial request
  let result = await rawBaseQuery(args, api, extraOptions);

  // Handle 401 errors reactively
  if (result.error?.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResult = await rawBaseQuery(
          { url: '/api/auth/refresh', method: 'GET' },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(setCredentials(refreshResult.data));
          // Retry original request
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (error) {
        api.dispatch(logout());
        return { error: { status: 401, data: 'Session expired' } };
      } finally {
        isRefreshing = false;
      }
    } else {
      // Queue retry for concurrent requests
      await new Promise(resolve => {
        pendingRequests.push(resolve as () => void);
      });
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery:baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Session"],
  endpoints: () => ({}),
  refetchOnFocus:true,
  refetchOnReconnect:true
});
