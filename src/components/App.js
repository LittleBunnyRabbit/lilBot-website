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

import io from 'socket.io-client';

import PrivateMatch from "./rocketLeague/PrivateMatch";
import Tournament from "./rocketLeague/Tournament";
import OneVOne from "./rocketLeague/OneVOne";
import Home from "./main/Home";
import CoinFlip from "./miscellaneous/CoinFlip";
import Contest from "./twitch/Contest";

import "../css/App.css";
import "../css/Main.css";


function App() {
    const [load, setLoad] = useState(false);
    const [password, setPassword] = useState(null);
    const [cookies, setCookie] = useCookies(['login']);
    useEffect(() => {
        console.log("load");
    }, [load]);
    
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
                        <NavDropdown.Item href="/discord-bot-status"> Bot Status </NavDropdown.Item>
                    </NavDropdown>

                    {/* Twitch */}
                    <NavDropdown title="Twitch" id="Twitch">
                        <NavDropdown.Item href="/twitch-bot-status"> Bot Status </NavDropdown.Item>
                        <NavDropdown.Item href="/twitch-contest"> Contest </NavDropdown.Item>
                        <NavDropdown.Item href="/twitch-poll"> Poll </NavDropdown.Item>
                    </NavDropdown>

                    {/* Miscellaneous */}
                    <NavDropdown title="Miscellaneous" id="Miscellaneous">
                        <NavDropdown.Item href="/misc-coinFlip"> Coin Flip </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

            <Switch>
                {/* Main */}
                <Route path="/home"><Home cookies={cookies} /></Route>

                {/* Rocket League */}
                <Route path="/rl-private-match"><PrivateMatch cookies={cookies} /></Route>
                <Route path="/rl-tournament"><Tournament cookies={cookies} /></Route>
                <Route path="/rl-1v1"><OneVOne cookies={cookies} /></Route>

                {/* Discord */}
                <Route path="/discord-bot-status"><h1>Bot Status</h1></Route>

                {/* Twitch */}
                <Route path="/twitch-bot-status"><h1>Bot Status</h1></Route>
                <Route path="/twitch-contest"><Contest /></Route>
                <Route path="/twitch-poll"><h1>Poll</h1></Route>
                
                {/* Miscellaneous */}
                <Route path="/misc-coinFlip"><CoinFlip/></Route>
            </Switch>
        </Router>
    );
}

export default App;
