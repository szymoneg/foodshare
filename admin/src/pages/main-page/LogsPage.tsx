import { useHistory, withRouter } from 'react-router-dom'
import "./MainPageStyle.css"
import {useEffect, useState} from "react";
import AuthService from "../../services/auth.service";
import logPageService from "./services/log-page.service";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import DrawerCustom from "./components/DrawerCustom";
import {Triangle} from "react-loader-spinner";

import { LogsModel } from "./models/LogsModel";

const drawerWidth = 340;

const LogsPage = (props: any) => {
    let pageName: string = "Lista logów"

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [logs, setLogs] = useState<LogsModel[] | []>([]);
    const {window} = props;

    let history = useHistory();

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            history.push('/login')
            window.location.reload();
        } else {
            getLogs(currentUser.token);
        }
    }, [])

    const getLogs = (token: string) => {
        logPageService.getServerLogs(token).then(
            (response: LogsModel[])=> {
                response.map((response: LogsModel) => {
                    setLogs(prevState => [...prevState, {
                        categoryName: response.categoryName,
                        data: response.data,
                        level: response.level,
                        startTime: response.startTime
                    }])
                })
                setIsLoading(false)
            },
            err => {
                setIsLoading(true)
                console.log(err);
            }
        )
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (<DrawerCustom/>);

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {pageName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`, bgcolor: 'red',}}}
            >
                <Toolbar/>
                {/*===================================Content bellow vvv=======================================*/}
                {isLoading ?
                    <Box sx={{mx: "auto", width: 200}}>
                        <Triangle
                            height="200"
                            width="200"
                            color='#1976D2'
                            ariaLabel='loading'
                        />
                    </Box> :
                    <>
                    </>
                }
            </Box>
        </Box>
    );
}

export default withRouter(LogsPage);
