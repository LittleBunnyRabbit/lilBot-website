import React, { useState, useEffect, useRef  } from 'react';
import { useCookies } from 'react-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { 
    NavDropdown, 
    Navbar, Container,
    Nav , InputGroup, FormControl, Button
} from 'react-bootstrap';

import Home from "./main/Home";

import "../css/App.css";
import "../css/Main.css";

import appRoutes from "./AppRoutes";

function App() {
    const [load, setLoad] = useState(false);
    const [cookies, setCookie] = useCookies(['login']);

    const [password, setPassword] = useState(null);

    const passwordRef = useRef(null);

    useEffect(() => {
        
    }, [load]);

    const MainPage = () => (
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

    const Login = () => (
      <Container
        style={{
          marginTop:"10%",
          textAlign: "center"
        }}
      >
        <div style={{ width: "100%" }}>
          <h1>LOGIN</h1>
          <br />
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-username">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl ref={ passwordRef } type="password"/>
          </InputGroup>
          <Button 
            variant="secondary" 
            type="button"
            onClick={ () => {
              setCookie('login', passwordRef.current.value, { path: '/' })
              setPassword(passwordRef.current.value)
            }} 
            style={{ width: "100%" }}
          > Submit </Button>
        </div>
      </Container>
    )

    return (
      <div>
        { cookies.login == process.env.REACT_APP_PASSWORD || password == process.env.REACT_APP_PASSWORD
          ? <MainPage />
          : <Login />
        }
      </div>
    );
}

export default App;
