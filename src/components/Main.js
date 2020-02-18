import React, { useState, useEffect  } from 'react';
import { Container, NavDropdown, Row, Button, ButtonGroup, Collapse, Tabs , Tab, Navbar, Nav, FormControl, Form } from 'react-bootstrap';
import "../css/App.css";
import "../css/Main.css";
import PrivateMatch from "./PrivateMatchNew";
import Tournament from "./Tournament";
import OneVOne from "./OneVOne";
import Home from "./Home";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function Main() {
    useEffect(() => {
      console.log("App");
    });
  
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home"> lilBot </Navbar.Brand>
                <Nav>
                    {/* Rocket League */}
                    <NavDropdown title="Rocket League" id="Rocket League">
                        <NavDropdown.Item href="/rl-private-match"> Private Match </NavDropdown.Item>
                        <NavDropdown.Item href="/rl-tournament"> Tournament </NavDropdown.Item>
                        <NavDropdown.Item href="/rl-1v1"> 1v1 </NavDropdown.Item>
                    </NavDropdown>
                    {/* Discord */}
                    <NavDropdown title="Discord" id="Discord">
                        <NavDropdown.Item href="/discord-status"> Status </NavDropdown.Item>
                    </NavDropdown>
                    {/* Twitch */}
                    <NavDropdown title="Twitch" id="Twitch">
                        <NavDropdown.Item href="/twitch-contest"> Contest </NavDropdown.Item>
                        <NavDropdown.Item href="/twitch-poll"> Poll </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

            <Switch>
                <Route path="/home"><Home /></Route>
                {/* Rocket League */}
                <Route path="/rl-private-match"><PrivateMatch /></Route>
                <Route path="/rl-tournament"><Tournament /></Route>
                <Route path="/rl-1v1"><OneVOne /></Route>
                {/* Discord */}
                <Route path="/discord-status"><h1>Status</h1></Route>
                {/* Twitch */}
                <Route path="/twitch-contest"><h1>Status</h1></Route>
            </Switch>
        </Router>
    );
}

export default Main;