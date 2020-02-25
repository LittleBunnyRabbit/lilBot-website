import React, { useState, useEffect  } from 'react';
import { 
  Alert, Overlay, Row, Button, 
  ButtonGroup, Col, Card, Table, 
  Form, Container, Tabs, Tab, 
  InputGroup, FormControl, Jumbotron 
} from 'react-bootstrap';

function OneVOne() {
    const [loadData, setLoadData] = useState(true);
    const [alert, setAlert] = useState({ show: false, info: "" });  
    const [newMatch, setNewMatch] = useState({ subsOnly: false });
    const [queue, setQueue] = useState({ participants:[], all: true, subscribers: true, mods: true });
    const [removedQueue, setRemovedQueue] = useState([]);
    const [queueDisplayType, setQueueDisplayType] = useState(true);

    useEffect(() => {
      dummyData()
    }, [loadData]);

    function dummyData() {
        setQueue({
          participants: [
            { username: "Player 1", isSub: false, isMod: true, id:"1"},
            { username: "Player 2", isSub: false, isMod: false, id:"2"},
            { username: "Player 3", isSub: true, isMod: false, id:"4"},
            { username: "Player 4", isSub: true, isMod: true, id:"5"},
            { username: "Player 5", isSub: false, isMod: false, id:"6"},
            { username: "Player 6", isSub: false, isMod: true, id:"7"},
            { username: "Player 7", isSub: true, isMod: true, id:"8"},
            { username: "Player 8", isSub: true, isMod: true, id:"9"},
            { username: "Player 9", isSub: false, isMod: false, id:"10"},
            { username: "Player 10", isSub: true, isMod: true, id:"11"},
            { username: "Player 11", isSub: true, isMod: false, id:"12"},
            { username: "Player 12", isSub: true, isMod: true, id:"13"},
            { username: "Player 13", isSub: false, isMod: false, id:"14"},
            { username: "Player 14", isSub: true, isMod: true, id:"15"},
            { username: "Player 15", isSub: false, isMod: true, id:"160"}
          ], all: true, subscribers: false, mods: true
        })
    }

    const RenderCreateMatch = () => {
      async function createMatch() {
          // return socket.emit("createMatch", newMatch);
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

    const RenderQueue = () => {
        const removeParticipant = async (id) => {
            // const participant = await queue.find(p => p.id === id);
            // if(!participant) return;
            // const newRemovedQueue = [ ...removedQueue ];
            // newRemovedQueue.push(participant);
            // setRemovedQueue(newRemovedQueue);
            // socket.emit("leaveQueue", { id });
        }

        const addParticipant = async (id) => {
            // const newRemovedQueue = [ ...removedQueue ];
            // const index = newRemovedQueue.findIndex(p => p.id === id);
            // if(index === -1) return;
            // const participant = await newRemovedQueue.splice(index, 1)[0];
            // setRemovedQueue(newRemovedQueue);
            // socket.emit("joinQueue", participant);
        }
        console.log({ queue });
        
        return (
          <div>
            <ButtonGroup aria-label="Basic example" style={{width:"100%"}}>
              <Button 
                variant={!!queue?.all ? "dark" : "outline-dark"} 
                style={{width:"34%"}}
                onClick={() => {
                  const q = {...queue};
                  q.all = !q.all
                  setQueue(q);
                }}
              > Chips </Button>
              <Button 
                variant={!!queue?.subs ? "dark" : "outline-dark"} 
                style={{width:"34%"}}
                onClick={() => {
                  const q = {...queue};
                  q.subs = !q.subs
                  setQueue(q);
                }}
              > Subs </Button>
              <Button 
                variant={!!queue?.mods ? "dark" : "outline-dark"}
                style={{width:"34%"}}
                onClick={() => {
                  const q = {...queue};
                  q.mods = !q.mods
                  setQueue(q);
                }}
              > Mods </Button>
            </ButtonGroup>

            <ButtonGroup aria-label="Basic example" style={{width:"100%",  marginTop:"5%", marginBottom:"5%"}}>
              <Button variant="outline-success" style={{width:"50%"}} onClick={() => setQueueDisplayType(true)}> 
                Active { queue?.participants?.length > 0 && ` (${queue.participants.length})`}
              </Button>
              <Button variant="outline-danger" style={{width:"50%"}} onClick={() => setQueueDisplayType(false)}> 
                Removed { removedQueue?.length > 0 && ` (${removedQueue.length})`}
              </Button>
            </ButtonGroup>

            { queueDisplayType 
              ? queue?.participants?.length > 0 && 
                <div>
                  <div style={{overflowY: "scroll", maxHeight:`${62 * 5 + 6}px`}}>
                    { QueueTable() } 
                  </div>
                  <br/>
                  <Button variant="dark" style={{width:"100%"}}> Clear </Button>
                </div>
              : removedQueue?.length > 0 &&
                <div>
                  <div style={{overflowY: "scroll", maxHeight:`${62 * 5 + 6}px`}}>
                    { RemovedQueueTable() } 
                  </div>
                  <br/>
                  <Button variant="dark" style={{width:"100%"}}> Clear </Button>
                </div>
            }

          </div>
        );

        function QueueTable() {
          return (
            <Table striped bordered hover>
              <tbody>
                { 
                  queue.participants.map((p, i) => {
                    return (
                      <tr>
                        <td className="participants-btn-td">
                          <Button 
                            variant="outline-danger" 
                            onClick={() => removeParticipant(p.id)}
                          > X </Button>
                        </td>
                        <td>
                          <p style={{ color: `${ p.isMod ? "green" : p.isSub ? "purple" : "black"}`}}>
                            {p.isMod ? "⚔️ " : ""}{p.isSub ? "🥔 " : ""}{ p.username }
                          </p>
                        </td>
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

    return (
        <Container>
            <br/>

            { alert?.show &&
              <Overlay target={this} show={alert?.show} placement="right-start">
                  <Alert 
                  variant="danger" 
                  onClose={() => setAlert({ show: false, info: "" })} 
                  dismissible
                  style={{height: "5%", paddingTop:"1%"}}
                  >
                  <h5>{ alert?.info }</h5>
                  </Alert>
              </Overlay>
            }

            <Row className="r-row">
            <Col className="r-col">
                <Card>
                  <Card.Header>Create</Card.Header>
                  <Card.Body>
                      { RenderCreateMatch() }
                  </Card.Body>
                </Card>
                <br />
                <Card>
                  <Card.Header>Match</Card.Header>
                  <Card.Body>
                      { "Match" }
                  </Card.Body>
                </Card>
            </Col>

            <Col className="r-col">
                <Card>
                  <Card.Header>Queue</Card.Header>
                  <Card.Body>
                      { RenderQueue() }
                  </Card.Body>
                </Card>
            </Col>
            </Row>  
        </Container>
    )
}

export default OneVOne;