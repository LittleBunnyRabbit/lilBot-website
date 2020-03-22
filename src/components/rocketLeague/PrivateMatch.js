import React, { useState, useEffect, useRef } from 'react';
import { 
  Row, Button, ButtonGroup, Table, 
  Container, InputGroup, FormControl,
  Dropdown
} from 'react-bootstrap';
import "../../css/PrivateMatch.css";
import io from 'socket.io-client';
import ErrorAlert from "../common/ErrorAlert";
import CardColumn from "../common/CardColumn";
import Queue from "../common/Queue"; 

const socket = io(`${process.env.REACT_APP_BASE_URL}/rl/privateMatch`, { 
  query: { username: "abc", password: 12312 } 
}); 

function PrivateMatch(props) {
    const [loadData, setLoadData] = useState(true);

    const [match, setMatch] = useState({});
    const [activeMatch, setActiveMatch] = useState([]);
    const [queue, setQueue] = useState([]);
    const [filters, setFilters] = useState([]);
    const [gamemode, setGamemode] = useState(null);

    const [alert, setAlert] = useState({ show: false, info: "" });  

    const mUsername = useRef(null);
    const mPassword = useRef(null);

    useEffect(() => {
        socket.on("match", (data) => !!data && setMatch(data));
        socket.on("activeMatch", (data) => !!data && setActiveMatch(data));
        socket.on("queue", (data) => !!data && setQueue(data));
        socket.on("filters", (data) => !!data && setFilters(data));
        socket.on("reqError", (data) => !!data && setAlert({ show: true, info: data.error }));

        socket.emit("getData", {
          match: true, activeMatch: true, queue: true, filters: true
        });
    }, [loadData]);

    return (
      <Container>
        <br/>
        <ErrorAlert target={ this } alert={ alert } setAlert={ setAlert }/>

        <Row className="r-row">
          <CardColumn title="Create" content={ <RenderCreateMatch /> } />
          <CardColumn title="Match" content={ <RenderMatchInfo /> } />
        </Row>  

        <br/>

        <Row className="r-row">
          <CardColumn title="Queue" content={ 
            <Queue queue={ queue }
                   leaveQueue={ (id) => socket.emit("leaveQueue", { id }) }
                   filters={ filters }
                   setFilters={(filters) => socket.emit("setData", { filters })}/>
           }/>
          <CardColumn title="Active Match" content={ <RenderActiveMatch /> } />
        </Row>
      </Container>
    );

    function RenderCreateMatch() {
      async function createMatch() {
          return socket.emit("createMatch", {
              username: mUsername.current.value,
              password: mPassword.current.value
          });
      }

      return (
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-username">Username</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl                 
              ref={ mUsername }
              style={{boxShadow: "none"}}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-password">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
              ref={ mPassword }
              style={{boxShadow: "none"}}
              placeholder="Auto Generated" 
            />
          </InputGroup>
          <Button 
              variant="secondary" 
              type="button"
              onClick={ createMatch } 
              style={{width:"100%"}}
          > Submit </Button>
        </div>
      );
    }

    function RenderMatchInfo() {
        return (
          <div>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td style={{width:"2%"}}>Username</td>
                  <td>{ match?.username }</td>
                </tr>
                <tr>
                  <td style={{width:"2%"}}>Password</td>
                  <td>{ match?.password }</td>
                </tr>
              </tbody>
            </Table>
            <Button 
              variant="secondary" 
              type="button"
              onClick={() => socket.emit("newPassword", { password: mPassword.current.value })} 
              style={{width:"100%"}}
            > New Password </Button>
          </div>
        );
    }

    function RenderActiveMatch() {
        const readdParticipant = async (id) => {
            const participant = activeMatch?.players.find(p => p.id == id);
            console.log(participant);
            
            if(!participant) return;
            socket.emit("joinQueue", participant);
        }

        const updateDropdown = (gamemode) => {
            setGamemode(gamemode);
        }

        return (
          <div>
            <Dropdown style={{width:"100%", marginBottom: "3%"}} onSelect={ updateDropdown }>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{width:"100%"}}>
              { gamemode ? `${gamemode}v${gamemode}` : "Select game mode"}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{width:"100%"}}>
                <Dropdown.Item eventKey="1">1v1</Dropdown.Item>
                <Dropdown.Item eventKey="2">2v2</Dropdown.Item>
                <Dropdown.Item eventKey="3">3v3</Dropdown.Item>
                <Dropdown.Item eventKey="4">4v4</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant="secondary" 
              style={{ width: "100%" }}
              onClick={ () => socket.emit("startMatch", { gamemode: gamemode }) }
              disabled={ !match?.username || !match?.password }
            > Start Match </Button>

            { activeMatch?.username && activeMatch?.password &&
              <Table striped bordered style={{marginTop:"5%"}}>
                <tbody>
                  <tr>
                    <td style={{width:"2%"}}>Username</td>
                    <td>{ activeMatch?.username }</td>
                  </tr>
                  <tr>
                    <td style={{width:"2%"}}>Password</td>
                    <td>{ activeMatch?.password }</td>
                  </tr>
                  <tr>
                    <td style={{width:"2%"}}>Gamemode</td>
                    <td>{ `${activeMatch?.gamemode}v${activeMatch?.gamemode}` }</td>
                  </tr>
                  <tr>
                    <td style={{width:"2%"}}>Filters</td>
                    <td>{ activeMatch?.filters.join(", ") }</td>
                  </tr>
                </tbody>
              </Table>
            }

            { activeMatch?.players &&
              <Table striped bordered style={{marginTop:"5%"}}>
                <tbody>
                  { 
                    activeMatch.players.map(p => (
                      <tr>
                        <td className="participants-btn-td">
                          <Button 
                            variant="outline-success" 
                            onClick={(e) => {
                              readdParticipant(p.id);
                              e.target.disabled = true;
                            }}
                          > ← </Button>
                        </td>
                        <td>
                          <p style={{ color: `${ p.moderator ? "green" : p.subscriber ? "purple" : "black"}`}}>
                              {p.moderator ? "⚔️ " : ""}{p.subscriber ? "🥔 " : ""}{ p.username }
                          </p>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            }
          </div>
        );
    }
}

export default PrivateMatch;