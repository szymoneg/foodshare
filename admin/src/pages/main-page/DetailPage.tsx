import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import AuthService from "../../services/auth.service";
import mainPageService from "./services/main-page.service";

interface stateType {
    id: string
}

function DetailPage() {
    const history = useHistory();
    const { state } = useLocation<stateType>();

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            history.push('/login')
        } else {
            getUserDetails(state.id, currentUser.token)
        }
    })

    const getUserDetails = (id: string, token: string) =>{
        mainPageService.getUserDetails(id, token).then(
            (response) => {
              console.log(response)
            },
            err => {
              console.log(err);
            }
          );
    }

    return (
        <div>
            <h1>Details page</h1>
            <h3>User ID: {state.id}</h3>
        </div>
    )
}

export default DetailPage;