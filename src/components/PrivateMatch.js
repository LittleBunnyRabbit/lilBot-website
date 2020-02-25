import React, { useState, useEffect, useRef } from 'react';
import { 
  Alert, Overlay, Row, Button, 
  ButtonGroup, Col, Card, Table, 
  Form, Container, Tabs, Tab, 
  InputGroup, FormControl, Jumbotron 
} from 'react-bootstrap';
import "../css/PrivateMatch.css";
import io from 'socket.io-client';

const socket = io("http://localhost:2513/private-match", { 
  query: { username: "abc", password: 12312 } 
});  

function PrivateMatch(props) {
    const [loadData, setLoadData] = useState(true);

    const [match, setMatch] = useState({});
    const [activeMatch, setActiveMatch] = useState([]);
    const [queue, setQueue] = useState([]);
    const [canJoin, setCanJoin] = useState(false);
    const [newMatch, setNewMatch] = useState({ subsOnly: false });
    const [removedQueue, setRemovedQueue] = useState([]);
    
    const [queueDisplayType, setQueueDisplayType] = useState(true);
    const [alert, setAlert] = useState({ show: false, info: "" });  

    useEffect(() => {
        socket.on("match", (data) => {
            if(!data) return;
            setMatch(data);
        });

        socket.on("activeMatch", (data) => {
            if(!data) return;
            setActiveMatch(data);
        });

        socket.on("queue", (data) => {
            if(!data) return;
            setQueue(data);
        });

        socket.on("canJoin", (data) => {
            if(!data) return;
            setCanJoin(data);
        });

        socket.on("reqError", (data) => {
            if(!data) return;
            setAlert({ show: true, info: data.error });
        });

        socket.emit("getData", {
            match: true,
            activeMatch: true,
            queue: true,
            canJoin: true
        });
    }, [loadData]);

    function makeDummyQueue() {
        socket.emit("setData", {
          queue: [
            { username: "Player 1",  isSub: true,  id:"1"},
            { username: "Player 2",  isSub: false, id:"2"},
            { username: "Player 3",  isSub: true,  id:"4"},
            { username: "Player 4",  isSub: true,  id:"5"},
            { username: "Player 5",  isSub: false, id:"6"},
            { username: "Player 6",  isSub: false, id:"7"},
            { username: "Player 7",  isSub: true,  id:"8"},
            { username: "Player 8",  isSub: true,  id:"9"},
            { username: "Player 9",  isSub: false, id:"10"},
            { username: "Player 10", isSub: true,  id:"11"},
            { username: "Player 11", isSub: true,  id:"12"},
            { username: "Player 12", isSub: true,  id:"13"},
            { username: "Player 13", isSub: false, id:"14"},
            { username: "Player 14", isSub: true,  id:"15"},
            { username: "Player 15", isSub: false, id:"160"}
          ]
        })
    }

    return (
      <Container>
        <br/>
        { alert?.show && <ErrorAlert target={ this } /> }

        <Row className="r-row">
          <CardColumn title="Create" content={ <RenderCreateMatch /> } />
          <CardColumn title="Match" content={ <RenderMatchInfo /> } />
        </Row>  

        <br/>

        <Row className="r-row">
          <CardColumn title="Queue" content={ <RenderQueue /> } />
          <CardColumn title="Active Match" content={ <RenderActiveMatch /> } />
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
        const removeParticipant = async (id) => {
            const participant = await queue.find(p => p.id === id);
            if(!participant) return;
            const newRemovedQueue = [ ...removedQueue ];
            newRemovedQueue.push(participant);
            setRemovedQueue(newRemovedQueue);
            socket.emit("leaveQueue", { id });
        }

        const addParticipant = async (id) => {
            const newRemovedQueue = [ ...removedQueue ];
            const index = newRemovedQueue.findIndex(p => p.id === id);
            if(index === -1) return;
            const participant = await newRemovedQueue.splice(index, 1)[0];
            setRemovedQueue(newRemovedQueue);
            socket.emit("joinQueue", participant);
        }
        
        return (
          <div>
            <ButtonGroup aria-label="Basic example" style={{width:"100%"}}>
              <Button variant="secondary" style={{width:"50%"}} onClick={() => socket.emit("getData", { queue: true })}> Refresh </Button>
              <Button variant="secondary" style={{width:"50%"}} onClick={() => socket.emit("setData", { queue: [] })} > Clear </Button>
            </ButtonGroup>

            <ButtonGroup aria-label="Basic example" style={{width:"100%",  marginTop:"5%", marginBottom:"5%"}}>
              <Button variant="outline-success" style={{width:"50%"}} onClick={() => setQueueDisplayType(true)}> 
                Active { queue?.length > 0 && ` (${queue.length})`}
              </Button>
              <Button variant="outline-danger" style={{width:"50%"}} onClick={() => setQueueDisplayType(false)}> 
                Removed { removedQueue?.length > 0 && ` (${removedQueue.length})`}
              </Button>
            </ButtonGroup>

            { queueDisplayType 
              ? queue?.length > 0 && 
                <div style={{overflowY: "scroll", maxHeight:`${62 * 5 + 6}px`}}>
                  { QueueTable() } 
                </div>
              : removedQueue?.length > 0 &&
                <div style={{overflowY: "scroll", maxHeight:`${62 * 5 + 6}px`}}>
                  { RemovedQueueTable() } 
                </div>
            }

          </div>
        );

        function QueueTable() {
          return (
            <Table striped bordered hover>
              <tbody>
                { 
                  queue.map((p, i) => {
                    return (
                      <tr>
                        <td className="participants-btn-td">
                          <Button 
                            variant="outline-danger" 
                            onClick={() => removeParticipant(p.id)}
                          > X </Button>
                        </td>
                        <td>{ p.username }</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
          );
        }
    
        function RemovedQueueTable() {
          return (
            <Table striped bordered hover>
              <tbody>
                { 
                removedQueue.map((p, i) => {
                    return (
                      <tr>
                        <td className="participants-btn-td">
                          <Button 
                            variant="outline-success" 
                            onClick={() => addParticipant(p.id)}
                          > ✓ </Button>
                        </td>
                        <td>{ p.username }</td>
                      </tr>
                    );
                  }) 
                }
              </tbody>
            </Table>
          );
        }
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
                    activeMatch.players.map(p => {
                      return (
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
                      )
                    })
                  }
                </tbody>
              </Table>
            }
          </div>
        );
    }

    function CardColumn(params) {
      const { content, title } = params;
      return (
        <Col className="r-col">
          <Card>
            <Card.Header>{ title }</Card.Header>
            <Card.Body>{ content }</Card.Body>
          </Card>
        </Col>
      );
    }

    function ErrorAlert(params) {
      const { target } = params;
      return (
        <Overlay target={ target } show={ alert?.show } placement="right-start">
          <Alert 
            variant="danger" 
            onClose={() => setAlert({ show: false, info: "" })} 
            dismissible
            style={{height: "5%", paddingTop:"1%"}}
          >
            <h5>{ alert?.info }</h5>
          </Alert>
        </Overlay>
      );
    }
}

export default PrivateMatch;