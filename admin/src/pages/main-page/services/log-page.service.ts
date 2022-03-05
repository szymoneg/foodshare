import axios, { Axios } from "axios";

const API_URL = "http://localhost:3000/api/admin/";

class LogsPageService{

    async getServerLogs(token: string){
        const response = await axios.get<any>(API_URL + "logs",{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    }
}

export default new LogsPageService();
