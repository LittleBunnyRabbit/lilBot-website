import React, { useState, useEffect  } from 'react';
import { Button, InputGroup,  FormControl} from 'react-bootstrap';
import Routes from "./Routes";
import { useCookies } from 'react-cookie';
import io from 'socket.io-client';

function App() {
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState(null);
  const [cookies, setCookie] = useCookies(['login']);
  useEffect(() => {
    console.log("load");
  }, [load]);
  
  return (
    // <div>
    //   { cookies?.login?.password ? (<Routes cookies={cookies} />) : logInPage() }
    // </div>    
    // <Routes />
    <Routes cookies={cookies} />
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

  async function checkPassword() {
    return true;
  }
}

export default App;
