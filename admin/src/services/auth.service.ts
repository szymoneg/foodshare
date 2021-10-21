import axios, { Axios } from "axios";

const API_URL = "http://localhost:3003/api/user/";

class AuthService{
    async login(login: string, password: string) {
        const response = await axios
            .post<any>(API_URL + "auth", {
                login,
                password
            });
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      }

    logout() :void{
        localStorage.removeItem('user')
    }

    getCurrentUser(){
        const userStr = localStorage.getItem('user');

        return userStr ? JSON.parse(userStr) : null;
    }
}

export default new AuthService();
