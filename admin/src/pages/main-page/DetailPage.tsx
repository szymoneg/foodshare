import {useEffect, useState} from "react";
import { useHistory, useLocation } from "react-router";
import AuthService from "../../services/auth.service";
import mainPageService from "./services/main-page.service";
import * as React from "react";
import DrawerCustom from "./components/DrawerCustom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import {UserModel} from "./models/UserModel";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import TagIcon from '@mui/icons-material/Tag';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import {Audio, Triangle} from 'react-loader-spinner';
import Button from "@mui/material/Button";

interface stateType {
    id: string
}

const drawerWidth = 340;

const  DetailPage = (props: any) => {
    let pageName: string = "Szczegóły użytkownika";

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {window} = props;

    const history = useHistory();
    const { state } = useLocation<stateType>();

    const[userDetails, setUserDetails] = useState<UserModel>({});
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            history.push('/login')
        } else {
            getUserDetails(state.id, currentUser.token)
        }
    },[])

    const getUserDetails = (id: string, token: string) =>{
        mainPageService.getUserDetails(id, token).then(
            (response) => {
              setUserDetails(response)
                setIsLoading(false)
            },
            err => {
                setIsLoading(true)
              console.log(err);
            }
          );
    }

    const handleEdit = (id: any) => {
        history.push({
            pathname: `/edit/${id}`,
            state: userDetails
        })
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
                    <Box sx={{ mx: "auto", width: 200 }}>
                        <Triangle
                            height="200"
                            width="200"
                            color='#1976D2'
                            ariaLabel='loading'
                        />
                    </Box> :
                    <>
                        <Button variant="contained" color={"success"} onClick={() => handleEdit(userDetails.id)} style={{ marginBottom: 5, marginRight: 5}}>Edytuj</Button>
                        <Button variant="contained" color={"error"} onClick={() => console.log('XDD')} style={{ marginBottom: 5}}>Usuń</Button>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: '#1976D2'}}>
                                        <TagIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="UID" secondary={userDetails.id} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: '#1976D2'}}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Nazwa użytkownika" secondary= {userDetails.username}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: '#1976D2'}}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Imię" secondary= {userDetails.name ? userDetails.name : ""}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: '#1976D2'}}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Nazwisko" secondary= {userDetails.surname ? userDetails.surname : ""}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: '#1976D2'}}>
                                        <AlternateEmailIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="E-mail" secondary={userDetails.email} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: '#1976D2'}}>
                                        <BookmarkAddIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Rola" secondary={userDetails.role} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: '#1976D2'}}>
                                        <IndeterminateCheckBoxIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText secondaryTypographyProps={{
                                    color: userDetails.active ? 'green' : 'red'
                                }}
                                              primary="Status konta"
                                              secondary={userDetails.active ? 'Aktywne' : 'Nie aktywne'}
                                />
                            </ListItem>
                        </List>
                    </>
                }
            </Box>
        </Box>
    )
}

export default DetailPage;
