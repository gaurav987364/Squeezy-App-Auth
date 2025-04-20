import axios from "axios";
const baseURL = "http://localhost:5000/api"

const options = {
    baseURL,
    timeout:10000, //10sec
    withCredentials:true
};

//normal api
const API = axios.create(options);

//refresh api
export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response)=>response);

API.interceptors.response.use(
    (res)=>{
        return res;
    }, 
    async (error)=>{
        const {data,status} = error.response;

        if(data.errorCode === "AUTH_TOKEN_NOT_FOUND" && status === 401){
            try {
                await APIRefresh.get("/auth/refresh");
                return APIRefresh(error.config);
            } catch (error) {
                console.log(error)
                window.location.href = '/'
            }
        }
        return Promise.reject({
            ...data
        })
    }
)

export default API;