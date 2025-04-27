import API from "./api";

type LoginType = {email:string, password:string};

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

export const loginMutation = async (data:LoginType)=>{
   return await API.post("/auth/login", data);
}


export const getUserSessionQueryFn = async () => await API.get(`/session/`);

export const sessionsQueryFn = async () => {
    const response = await API.get<SessionResponseType>(`/session/getall`);
    return response.data;
};

export const sessionDelMutationFn = async (id: string) =>
    await API.delete(`/session/${id}`);