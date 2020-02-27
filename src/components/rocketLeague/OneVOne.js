import React, { useState, useEffect  } from 'react';
import { 
  Alert, Overlay, Row, Button, 
  ButtonGroup, Col, Card, Table, 
  Form, Container, Tabs, Tab, 
  InputGroup, FormControl, Jumbotron,
  ToggleButtonGroup, ToggleButton
} from 'react-bootstrap';

import ErrorAlert from "../common/ErrorAlert";
import CardColumn from "../common/CardColumn";
import Queue from "../common/Queue";

function OneVOne() {
    const [loadData, setLoadData] = useState(true);
    const [alert, setAlert] = useState({ show: false, info: "" });  
    const [newMatch, setNewMatch] = useState({ subsOnly: false });
    const [queue, setQueue] = useState([]);
    const [removedQueue, setRemovedQueue] = useState([]);
    const [queueDisplayType, setQueueDisplayType] = useState(null);
    const [queueOptions, setQueueOptions] = useState([]);

    useEffect(() => {
      dummyData()
    }, [loadData]);

    function dummyData() {
        setQueue([
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
        ])
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
        
        return (
          <div>
            <ToggleButtonGroup 
              type="checkbox" 
              value={ queueOptions } 
              style={{ width:"100%" }} 
              onChange={value => setQueueOptions(value)}
            >
              <ToggleButton value="chips" variant="outline-dark" style={{ width:"34%" }}> 
                Chips
              </ToggleButton>
              <ToggleButton value="subs" variant="outline-dark" style={{ width:"34%" }}> 
                Subs
              </ToggleButton>
              <ToggleButton value="mods" variant="outline-dark" style={{ width:"34%" }}> 
                Mods 
              </ToggleButton>
            </ToggleButtonGroup>

            <br /><br />

            <Queue queue={ queue }
                  joinQueue={ addParticipant }
                  leaveQueue={ removeParticipant }/>

          </div>
        );
    }

    return (
        <Container>
            <br/>
            <ErrorAlert target={ this } alert={ alert } setAlert={ setAlert }/>

            <Row className="r-row">
              <Col className="r-col">
                  <Card>
                    <Card.Header>Create</Card.Header>
                    <Card.Body><RenderCreateMatch /></Card.Body>
                  </Card>
                  <br />
                  <Card>
                    <Card.Header>Match</Card.Header>
                    <Card.Body>{ "Match" }</Card.Body>
                  </Card>
              </Col>
              <CardColumn title="Queue" content={ <RenderQueue /> } />
            </Row>  
        </Container>
    )
}

export default OneVOne;