import axios, { Axios } from "axios";

const API_URL = "http://localhost:3003/api/user/";

class MainPageService{
    async getAllUsers(token: string){
        const response = await axios
            .get<any>(API_URL + "all",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        
        return response.data;
    }

    async getUserDetails(id: string, token: string){
        const response = await axios
            .get<any>(API_URL + `id/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        return response.data;
    }

    async getServerLogs(token: string){
        console.log("logi servera")
    }
}

export default new MainPageService();