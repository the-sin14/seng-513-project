import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", {email, password});
    if (res.status !== 200) {
        throw new Error("Unable to login to the page");
        
    }
    const data = await res.data;
    return data;
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth");

    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};


export const sendCharRequest = async (message:string) => {
    const res = await axios.post("/chat/new", {message});

    if (res.status !== 200) {
      throw new Error("Unable to send the message!");
    }

    const data = await res.data;
    return data;
};