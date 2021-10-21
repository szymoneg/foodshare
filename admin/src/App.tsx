import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
            </Switch>
        </Router>
    </div>;
}

export default App;