import React, { useState, useEffect  } from 'react';
import { Container, Row, Button, ButtonGroup, Collapse, Input, InputGroup,  FormControl} from 'react-bootstrap';
import Main from "./Main";

function App() {
  const pwd = require("../config.json").password;
  const [load, setLoad] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [password, setPassword] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(BASE_URL);

  useEffect(() => {
    console.log("load");
    
  }, [load]);
  
  return (
    <div>
      {/*{ logedIn ? (<Main />) : logInPage() }*/}
      <Main />
    </div>    
    // <Main />
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
    setLogedIn(true);
  }
}

export default App;
