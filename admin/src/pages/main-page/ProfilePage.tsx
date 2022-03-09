import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import {useEffect, useState} from "react";
import AuthService from "../../services/auth.service";
import {UserModel} from "./models/UserModel";
import mainPageService from "./services/main-page.service";
import {useHistory, withRouter} from 'react-router-dom'
import "./MainPageStyle.css"
import DrawerCustom from "./components/DrawerCustom";

const drawerWidth = 340;


interface Column {
    id: 'id' | 'active' | 'email' | 'isAdmin' | "username" | "role";
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'ID', minWidth: 150 },
    { id: 'username', label: 'Username', minWidth: 100 },
    {
        id: 'email',
        label: 'E-mail',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'isAdmin',
        label: 'Administrator',
        minWidth: 50,
        align: 'center'
    }
];


const ProfilePage = (props: any) => {
    let pageName: string = "Lista użytkowników"

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {window} = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [redirect, setRedirect] = useState('');
    const [userReady, setUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<UserModel>>({});
    const [users, setUsers] = useState<UserModel[] | []>([]);

    let history = useHistory();

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            history.push('/login')
            window.location.reload();
        } else {
            getAllUsers(currentUser.token);
            setUserReady(true);
        }
    }, [])

    const getAllUsers = (token: string) => {
        mainPageService.getAllUsers(token).then(
            (response) => {
                response.map((response: UserModel) => {
                    setUsers(prevItems => [...prevItems, {
                        id: response.id,
                        email: response.email,
                        isAdmin: response.isAdmin,
                        name: response.name,
                        username: response.username
                    }]);
                })
            },
            err => {
                console.log(err);
            }
        );
    }

    const handleAdd = () => {
        history.push({
            pathname: "/add"
        })
    }

    const handleEdit = (id: any) => {
        history.push({
            pathname: `/details/${id}`,
            state: {id: id}
        })
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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

                <Button variant="contained" color={"success"} onClick={handleAdd} style={{ marginBottom: 5}}>Dodaj nowego użtykownika</Button>

                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align} onClick={() => handleEdit(value)}>
                                                            {column.id === 'isAdmin' ? (row.isAdmin ? <CheckCircleIcon/> : <CancelIcon/>) : value }
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Box>
    );
}

export default withRouter(ProfilePage);
