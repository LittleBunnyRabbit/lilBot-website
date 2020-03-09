import React, { useState, useEffect  } from 'react';
import { useCookies } from 'react-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { 
    NavDropdown, 
    Navbar, 
    Nav 
} from 'react-bootstrap';

import Home from "./main/Home";

import "../css/App.css";
import "../css/Main.css";

import appRoutes from "./AppRoutes";

function App() {
    const [load, setLoad] = useState(false);
    const [cookies, setCookie] = useCookies(['login']);

    useEffect(() => {
        console.log("load");
    }, [load]);
    
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home"> lilBot </Navbar.Brand>
                <Nav>
                    {
                        appRoutes.map(route => (
                            <NavDropdown title={ route.name } id={ route.name }>
                            { 
                                route.children.map(child => (
                                    <NavDropdown.Item href={ route.path + child.path }>
                                        { child.name }
                                    </NavDropdown.Item>
                                ))                            
                            }
                            </NavDropdown>
                        ))
                    }
                </Nav>
            </Navbar>
            <Switch>
                <Route path="/home" component={ Home }/>
                {
                    appRoutes.map(route => (
                        route.children.map(child => (
                            <Route path={ route.path + child.path } component={ child.component }/>
                        ))
                    ))
                }
            </Switch>
        </Router>
    );
}

export default App;
