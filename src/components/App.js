import React, { useState, useEffect  } from 'react';
import { Container, Row, Button, ButtonGroup, Collapse, Input, InputGroup,  FormControl} from 'react-bootstrap';
import Main from "./Main";

function App() {
  const pwd = require("../config.json").password;
  const [logedIn, setLogedIn] = useState(false);
  const [password, setPassword] = useState(null);
  return (
    <div>
      { logedIn ? (<Main />) : logInPage() }
    </div>    
  );

  function logInPage() {
    return (
      <div style={{textAlign:"center"}}>
        <h1>Log in</h1>
        <InputGroup type="password">
            <InputGroup.Prepend type="password">
              <InputGroup.Text type="password">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
            />
          </InputGroup>
        <Button onClick={checkPassword} >Log In</Button>
      </div>
    );
  }

  function checkPassword() {
    if(pwd == password) {
      setLogedIn(true);
    } else {
      setPassword("");
      setLogedIn(false);
    }
  }
}

export default App;
