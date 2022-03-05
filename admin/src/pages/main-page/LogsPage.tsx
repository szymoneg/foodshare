import { useHistory, withRouter } from 'react-router-dom'
import "./MainPageStyle.css"
import {useEffect, useState} from "react";
import {UserModel} from "./models/UserModel";
import AuthService from "../../services/auth.service";
import logPageService from "./services/log-page.service";


const LogsPage: React.FC<any> = () => {
    const [redirect, setRedirect] = useState('');
    const [userReady, setUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<UserModel>>({});

    let history = useHistory();

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            history.push('/login')
            window.location.reload();
        } else {
            getLogs(currentUser.token);
            setUserReady(true);
        }
    }, [])

    const getLogs = (token: string) => {
        logPageService.getServerLogs(token).then(
            (response: any)=> {
                console.log(response)
            },
            err => {
                console.log(err);
            }
        )
    }

    return (
        <div>
            Siema
        </div>
    )
}

export default withRouter(LogsPage);
