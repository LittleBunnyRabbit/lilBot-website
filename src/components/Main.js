import React, { useState, useEffect  } from 'react';
import { Container, NavDropdown, Row, Button, ButtonGroup, Collapse, Tabs , Tab, Navbar, Nav, FormControl, Form } from 'react-bootstrap';
import "../css/App.css";
import "../css/Main.css";
import PrivateMatch from "./PrivateMatch";
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
                <Navbar.Brand href="/home">
                    lilBot
                </Navbar.Brand>
                <Nav>
                    <NavDropdown title="Rocket League" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/private-match">Private Match</NavDropdown.Item>
                        <NavDropdown.Item href="/trournament">Tournament</NavDropdown.Item>
                        <NavDropdown.Item href="/1v1">1v1</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/private-match">
                    <PrivateMatch />
                </Route>
                <Route path="/trournament">
                    <Tournament />
                </Route>
                <Route path="/1v1">
                    <OneVOne />
                </Route>
            </Switch>
        </Router>
    );
}

export default Main;