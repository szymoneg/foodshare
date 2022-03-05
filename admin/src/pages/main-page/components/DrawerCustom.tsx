import { useHistory, withRouter } from 'react-router-dom'
import AuthService from "../../../services/auth.service";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupIcon from "@mui/icons-material/Group";
import ListItemText from "@mui/material/ListItemText";
import StorageIcon from "@mui/icons-material/Storage";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import * as React from "react";

const DrawerCustom = (props: any) => {
    let history = useHistory();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {window} = props;

    const handleLogout = () => {
        history.push('/login')
        AuthService.logout();
    }

    const handleEdit = (id: any) => {
        history.push({
            pathname: `/details/${id}`,
            state: {id: id}
        })
    }

    const handleUserList = () => {
        history.push({
            pathname: "/main-page"
        })
    }

    const handleShowLog = () => {
        history.push({
            pathname: "/logs"
        })
    }

    return (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                <ListItem button onClick={handleUserList}>
                    <ListItemIcon>
                        <GroupIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Lista użytkowników'}/>
                </ListItem>

                <ListItem button onClick={handleShowLog}>
                    <ListItemIcon>
                        <StorageIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Lista logów'}/>
                </ListItem>

                <ListItem button onClick={handleShowLog}>
                    <ListItemIcon>
                        <WarningIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Zgłoszenia'}/>
                </ListItem>

                <ListItem button onClick={handleShowLog}>
                    <ListItemIcon>
                        <CheckCircleOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Administratorzy'}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Wyloguj się'}/>
                </ListItem>
            </List>
        </div>
    )
}

export default withRouter(DrawerCustom);
