import { AUTH_BASE_URL } from "../constants";
import { logout, setCredentials } from "../slices/AuthSlice";
import { apiSlice } from "./ApiSlice";

//type-safety
type SessionType = {
    _id: string;
    userId: string;
    userAgent: string;
    createdAt: string;
    expiresAt: string;
    isCurrent: boolean;
  };
  
type SessionResponseType = {
    message: string;
    sessions: SessionType[];
};

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                url:`${AUTH_BASE_URL}/auth/register`,
                method:"POST",
                body:data
            })
        }),
        login:builder.mutation({
            query:(data)=>({
                url:`${AUTH_BASE_URL}/auth/login`,
                method:"POST",
                body:data,
                credentials:"include" //sent/recieve cookie
            })
        }),
        verifyEmail:builder.mutation({
            query:(data)=>({
                url:`${AUTH_BASE_URL}/auth/verify/email`,
                method:"POST",
                body:data,
            })
        }),
        forgotPassword:builder.mutation({
            query:(data)=>({
                url:`${AUTH_BASE_URL}/auth/password/forgot`,
                method:"POST",
                body:data
            })
        }),
        resetPassword:builder.mutation({
            query:(data)=>({
                url:`${AUTH_BASE_URL}/auth/password/reset`,
                method:"POST",
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${AUTH_BASE_URL}/auth/logout`,
                method:"POST",
                credentials:"include"
            })
        }),
        getCurrentSession:builder.query({
            query:()=>({
                url:`${AUTH_BASE_URL}/session/`,
                method:"GET",
                credentials: "include",
            }),
            providesTags:["Session"], //invalidate
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setCredentials(data?.user));
                } catch (error) {
                    //maybe session expired
                    console.error(error)
                    dispatch(logout()) //from store
                }
            }
        }),
        getAllSession: builder.query<SessionResponseType, void>({
            query: () => ({
              url: `${AUTH_BASE_URL}/session/getall`,
              method: "GET",
              credentials: "include",
            }),
            // Add extra error handling
            transformErrorResponse: (response) => {
              if (response.status === 401) {
                return { ...response, data: { message: 'Refreshing session...' } };
              }
              return response;
            },
            // Force fresh request every time
            forceRefetch: () => true,
            providesTags: ["Session"], //re-fetch
          }),
        deleteSession:builder.mutation({
            query:(id:string)=>({
                url:`${AUTH_BASE_URL}/session/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["Session"] // updtaes ui
        })
    })
})

export const {
    useRegisterMutation, 
    useLoginMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLogoutMutation,
    useGetCurrentSessionQuery,
    useGetAllSessionQuery,
    useDeleteSessionMutation
} = authApi;