/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { logout, setCredentials } from "../slices/AuthSlice";
import { RootState } from "../Store";


const rawBaseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  credentials:"include", // sent cookie with every request to server
});

let isRefreshing = false;

// ApiSlice.ts - Updated baseQueryWithReauth implementation
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // Get current state to check auth status
  const state = api.getState() as RootState;
  let result = await rawBaseQuery(args, api, extraOptions);

  // Check if we need to refresh token (both proactive and reactive)
  if (result.error?.status === 401) {
    try {
      // Prevent multiple refresh attempts
      if (!isRefreshing) {
        isRefreshing = true;
        
        // Attempt token refresh
        const refreshResult = await rawBaseQuery(
          { url: '/api/auth/refresh', method: 'GET' },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Store new credentials and expiration
          api.dispatch(setCredentials(refreshResult.data));
          
          // Retry original request with new token
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          throw new Error('Token refresh failed');
        }
      }
    } catch (error) {
      // If refresh fails, logout and reject all pending requests
      api.dispatch(logout());
      return result; // Return original 401 error
    } finally {
      isRefreshing = false;
    }
  }

  // Proactive token refresh check
  const expiryTime = parseInt(localStorage.getItem('expiryTime') || '0', 10);
  const currentTime = Date.now();
  const buffer = 5 * 60 * 1000; // 5 minutes buffer

  if (!isRefreshing && expiryTime && currentTime >= expiryTime - buffer) {
    try {
      isRefreshing = true;
      const refreshResult = await rawBaseQuery(
        { url: '/auth/refresh', method: 'GET' },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(setCredentials(refreshResult.data));
      }
    } catch (error) {
      api.dispatch(logout());
    } finally {
      isRefreshing = false;
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
