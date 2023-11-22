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


export const sendChatRequest = async (message:string) => {
    const res = await axios.post("/chat/new", {message});

    if (res.status !== 200) {
      throw new Error("Unable to send");
    }

    const data = await res.data;
    return data;
};

export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("logout");
    }
    const data = await res.data;
    return data;
  };

  export const signUpUser = async (name: string, email: string, password: string) => {
    const res = await axios.post("/user/signup", {name, email, password});
    if (res.status !== 201) {
        throw new Error("Unable to Sign up to the page");
        
    }
    const data = await res.data;
    return data;
}