import React, { useState, useEffect } from 'react';
import { 
  Row, Button, ButtonGroup, Table, 
  Container, InputGroup, FormControl
} from 'react-bootstrap';
import "../../css/PrivateMatch.css";
import io from 'socket.io-client';
import ErrorAlert from "../common/ErrorAlert";
import CardColumn from "../common/CardColumn";
import Queue from "../common/Queue";

const socket = io("http://localhost:7777/rl/privateMatch", { 
  query: { username: "abc", password: 12312 } 
});  

function PrivateMatch(props) {
    const [loadData, setLoadData] = useState(true);

    const [match, setMatch] = useState({});
    const [activeMatch, setActiveMatch] = useState([]);
    const [queue, setQueue] = useState({});
    const [canJoin, setCanJoin] = useState(false);
    const [newMatch, setNewMatch] = useState({ subsOnly: false });

    const [alert, setAlert] = useState({ show: false, info: "" });  

    useEffect(() => {
        socket.on("match", (data) => !!data && setMatch(data));
        socket.on("activeMatch", (data) => !!data && setActiveMatch(data));
        socket.on("queue", (data) => !!data && setQueue(data));
        socket.on("canJoin", (data) => !!data && setCanJoin(data));
        socket.on("reqError", (data) => !!data && setAlert({ show: true, info: data.error }));

        socket.emit("getData", {
          match: true, activeMatch: true, queue: true
        });
    }, [loadData]);

    function makeDummyQueue() {
        socket.emit("setData", {
          queue: {
            options: {
              subscriber: false,
              moderator: false
            },
            participants: [
              { username: "Player 1",  moderator: true, subscriber: false, id:"1"},
              { username: "Player 2",  moderator: false, subscriber: true, id:"2"},
              { username: "Player 3",  moderator: true,  subscriber: false, id:"4"},
              { username: "Player 4",  moderator: true,  subscriber: true, id:"5"},
              { username: "Player 5",  moderator: false, subscriber: true, id:"6"},
              { username: "Player 6",  moderator: false, subscriber: false, id:"7"},
              { username: "Player 7",  moderator: true,  subscriber: false, id:"8"},
              { username: "Player 8",  moderator: true,  subscriber: true, id:"9"},
              { username: "Player 9",  moderator: false, subscriber: false, id:"10"},
              { username: "Player 10", moderator: true,  subscriber: true, id:"11"},
              { username: "Player 11", moderator: true,  subscriber: false, id:"12"},
              { username: "Player 12", moderator: true,  subscriber: true, id:"13"},
              { username: "Player 13", moderator: false, subscriber: false, id:"14"},
              { username: "Player 14", moderator: true,  subscriber: true, id:"15"},
              { username: "Player 15", moderator: false, subscriber: true, id:"160"}
            ]
          }
        })
    }

    return (
      <Container>
        <br/>
        <ErrorAlert target={ this } alert={ alert } setAlert={ setAlert }/>

        {/* <Row className="r-row">
          <CardColumn title="Create" content={ <RenderCreateMatch /> } />
          <CardColumn title="Match" content={ <RenderMatchInfo /> } />
        </Row>   */}

        <br/>

        <Row className="r-row">
          <CardColumn title="Queue" content={ <RenderQueue /> } />
          {/* <CardColumn title="Active Match" content={ <RenderActiveMatch /> } /> */}
        </Row>

        <br/><br/><br/>

        <ButtonGroup aria-label="Basic example" style={{width:"100%"}}>
          <Button variant="secondary" style={{width:"50%"}} onClick={makeDummyQueue}> DUMMY </Button>
          <Button variant="secondary" style={{width:"50%"}} onClick={() => socket.emit("setData", {activeMatch: {}})}> Clear Match </Button>
        </ButtonGroup>
      </Container>
    );

    function RenderCreateMatch() {
      async function createMatch() {
          return socket.emit("createMatch", newMatch);
      }

      return (
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-username">Username</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl                 
              value={newMatch?.username} 
              onChange={(e) => {
                const nm = { ...newMatch }
                nm.username = e.target.value;
                setNewMatch(nm);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-password">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
              value={newMatch?.password} 
              onChange={(e) => {
                const nm = { ...newMatch }
                nm.password = e.target.value;
                setNewMatch(nm);
              }}
              placeholder="Auto Generated" 
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Checkbox
                checked={newMatch?.subsOnly} 
                onChange={(e) => {
                  const nm = { ...newMatch }
                  nm.subsOnly = e.target.checked;
                  setNewMatch(nm);
                }}
              />
            </InputGroup.Prepend>
            <FormControl 
              value={newMatch?.subsOnly ? "Subscribers only" : "Everyone"}
              disabled
            />
          </InputGroup>
          <Button 
              variant="secondary" 
              type="button"
              onClick={ createMatch } 
              style={{width:"100%"}}
              disabled={!newMatch?.username || newMatch?.username.trim() == ""}
          > Submit </Button>
        </div>
      );
    }

    function RenderMatchInfo() {
        function newPassword() {
            return socket.emit("newPassword", { password: newMatch.password });
        }

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
                <tr>
                  <td style={{width:"2%"}}>Type</td>
                  <td>{ match?.subsOnly ? "Subscribers only" : "Everyone" }</td>
                </tr>
              </tbody>
            </Table>
            <Button 
              variant="secondary" 
              type="button"
              onClick={newPassword} 
              style={{width:"100%"}}
            > New Password </Button>
          </div>
        );
    }

    function RenderQueue() {
        return (
          <div>
            <Queue queue={ queue.participants }
                   options={ queue.options }
                   joinQueue={ (participant) => socket.emit("joinQueue", participant) }
                   leaveQueue={ (id) => socket.emit("leaveQueue", { id }) }
                   updateOptions={ (options) => socket.emit("updateOptions", options) }/>
          </div>
        );
    }

    function RenderActiveMatch() {
        const readdParticipant = async (id) => {
            const participant = activeMatch?.players.find(p => p.id == id);
            const hasParticipant = queue.find(p => p.id == id);
            if(!participant || hasParticipant) return;
            socket.emit("joinQueue", participant);
        }

        return (
          <div>
            <Button
              variant="secondary" 
              style={{ width: "100%" }}
              onClick={ () => socket.emit("startMatch") }
              disabled={ !match?.username || !match?.password || (typeof match?.subsOnly !== "boolean") }
            > Start Match </Button>

            { activeMatch?.username && activeMatch?.password &&
              <Table striped bordered hover style={{marginTop:"5%"}}>
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
                    <td style={{width:"2%"}}>Type</td>
                    <td>{ activeMatch?.subsOnly ? "Subscribers only" : "Everyone" }</td>
                  </tr>
                </tbody>
              </Table>
            }

            { activeMatch?.players &&
              <Table striped bordered hover style={{marginTop:"5%"}}>
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
                        <td>{p.username}</td>
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