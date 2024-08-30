import AxiosInstance from "./";
// ------------------------------------

const authService = {
    login: async function (email = "", password = "") {
        const response = await AxiosInstance.post("/auth/admins/login", { email, password });
        return response.data;
    },
    logout: async function () {
       const response = await AxiosInstance.delete("/auth/admins/logout");
       return response.data;
    }
}

export default authService;