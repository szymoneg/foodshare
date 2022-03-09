import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import * as React from 'react';


import {useEffect, useState} from "react";
import {UserModel} from "./models/UserModel";
import {useHistory, withRouter} from 'react-router-dom'
import "./MainPageStyle.css"
import DrawerCustom from "./components/DrawerCustom";
import {useLocation} from "react-router";
import {SelectChangeEvent} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const drawerWidth = 340;


const AddUserPage = (props: any) => {
    let pageName: string = "Edycja użytkownika"

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {window} = props;
    const { state } = useLocation<UserModel>();

    const [redirect, setRedirect] = useState('');
    const [userReady, setUserReady] = useState(false);
    const [role, setRole] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    let history = useHistory();

    useEffect(() => {
        console.log(state);
    }, [])


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

                <Box
                    sx={{
                        display: 'flex',
                        maxWidth: 450,
                        flexDirection: 'column',
                        alignItems: 'left',
                        '& > :not(style)': { m: 1 },
                    }}
                >
                    <FormGroup>
                        <TextField
                            helperText=" "
                            id="demo-helper-text-aligned"
                            label="Nazwa użytkownika"
                            value={state.username}
                        />

                        <TextField
                            helperText=" "
                            id="demo-helper-text-aligned"
                            label="E-mail"
                            value={state.email}
                        />

                        <TextField
                            helperText=" "
                            id="demo-helper-text-aligned"
                            label="Imię"
                            value={state?.name}
                        />

                        <TextField
                            helperText=" "
                            id="demo-helper-text-aligned"
                            label="Nazwisko"
                            value={state?.surname}
                        />

                        <TextField
                            id="demo-simple-select"
                            value={state?.role}
                            select
                            label="Rola"
                        >
                            <MenuItem value={'user'}>Użytkownik</MenuItem>
                            <MenuItem value={'admin'}>Administrator</MenuItem>
                            <MenuItem value={'mod'}>Moderator</MenuItem>
                        </TextField>

                        <FormControlLabel sx={{marginTop: 2}} control={<Checkbox />} label="Status konta" />
                    </FormGroup>

                    <Button variant="contained" onClick={() => history.push('/main-page')}>Edytuj</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default withRouter(AddUserPage);
