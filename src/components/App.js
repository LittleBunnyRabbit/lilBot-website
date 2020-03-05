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
    const [routes, setRoutes] = useState(null);
    const [routesNavs, setRoutesNavs] = useState(null);

    useEffect(() => {
        console.log("load");
        createRoutes();
    }, [load]);
    
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home"> lilBot </Navbar.Brand>
                <Nav>{ routesNavs }</Nav>
            </Navbar>
            <Switch>
                <Route path="/home" component={ Home }/>
                { routes }
            </Switch>
        </Router>
    );

    function createRoutes() {
        const newRoutes = [];
        const newRoutesNavs = [];

        for(const route of appRoutes) {
            const navDropdowns = [];
            for(const child of route.children) {
                newRoutes.push(<Route path={ route.path + child.path } component={ child.component }/>);
                navDropdowns.push(
                    <NavDropdown.Item href={ route.path + child.path }>
                        { child.name }
                    </NavDropdown.Item>
                );
            }
            newRoutesNavs.push(
                <NavDropdown title={ route.name } id={ route.name }>
                    { navDropdowns }
                </NavDropdown>
            );
        }
        setRoutes(newRoutes);
        setRoutesNavs(newRoutesNavs)
    }
}

export default App;
