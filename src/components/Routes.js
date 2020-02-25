import React, { useState, useEffect  } from 'react';
import { Container, NavDropdown, Row, Button, ButtonGroup, Collapse, Tabs , Tab, Navbar, Nav, FormControl, Form } from 'react-bootstrap';
import "../css/App.css";
import "../css/Main.css";
import PrivateMatch from "./PrivateMatch";
import Tournament from "./Tournament";
import OneVOne from "./OneVOne";
import Home from "./Home";
import Marbles from "./Marbles"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function Routes(props) {
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
                    {/* Miscellaneous */}
                    <NavDropdown title="Miscellaneous" id="Miscellaneous">
                        <NavDropdown.Item href="/misc-marbles"> Marbles </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

            <Switch>
                <Route path="/home"><Home cookies={props.cookies} /></Route>
                {/* Rocket League */}
                <Route path="/rl-private-match"><PrivateMatch cookies={props.cookies} /></Route>
                <Route path="/rl-tournament"><Tournament cookies={props.cookies} /></Route>
                <Route path="/rl-1v1"><OneVOne cookies={props.cookies} /></Route>
                {/* Discord */}
                <Route path="/discord-status"><h1>Status</h1></Route>
                {/* Twitch */}
                <Route path="/twitch-contest"><h1>Status</h1></Route>
                {/* Miscellaneous */}
                <Route path="/misc-marbles"><Marbles/></Route>
            </Switch>
        </Router>
    );
}

export default Routes;