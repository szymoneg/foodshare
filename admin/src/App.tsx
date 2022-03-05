import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginPage from "./pages/login-page/LoginPage";
import ProfilePage from "./pages/main-page/ProfilePage";
import TestPage from "./pages/test-page/TestPage";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import DetailPage from "./pages/main-page/DetailPage";
import LogsPage from "./pages/main-page/LogsPage";
import AddUserPage from "./pages/main-page/AddUserPage";

function App(): JSX.Element {
    return <div>
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/test">
                    <TestPage />
                </Route>
                <Route path="/main-page">
                    <ProfilePage />
                </Route>
                <Route path="/details/:id">
                    <DetailPage />
                </Route>
                <Route path="/logs">
                    <LogsPage />
                </Route>
                <Route path="/add">
                    <AddUserPage />
                </Route>
            </Switch>
        </Router>
    </div>;
}

export default App;
