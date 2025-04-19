const baseUrl = "http://localhost:5000"

//helper to any api call with auto refresh;
export const apiFetch = async (path : string, options:RequestInit = {})=>{
    //always include cookies;
    const opts = {
        credentials: "include" as RequestCredentials,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    }

    //try original request;
    let res = await fetch(baseUrl + path, opts);
    console.log(res);

    //if 401 or "Unauthorized"
    if(res.status === 401){
        //try to refresh token
        const refresh = await fetch(baseUrl+ "/api/auth/refresh",{
            method:"GET",
            credentials:"include",
        });

        if(refresh.ok){
            //refresh worked -> retry original
            res = await fetch(baseUrl+path, opts);
        } else{
            //refresh failed-> logout
            window.location.href="/login";
            throw new Error("session expired.")
        }
    }

    if(!res.ok){
        // throw the error body so callers can catch it
        const errBody = await res.json();
        throw errBody;
    }
    // Return JSON data on success
  return res.json();
};