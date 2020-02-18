import React, { useState, useEffect, useRef } from 'react';
import { Alert, Overlay , Row, Button, ButtonGroup, Col, Card, Table, Form, Container, Tabs, Tab, InputGroup, FormControl, Jumbotron } from 'react-bootstrap';
import "../css/PrivateMatch.css";
import request from "request";

const socket = new WebSocket('ws://localhost:12312');

function PrivateMatch() {
    const [loadData, setLoadData] = useState(true);
    const [match, setMatch] = useState(null);
    const [queue, setQueue] = useState([]);
    const [players, setPlayers] = useState([]);
    const [canJoin, setCanJoin] = useState(false);
    const [dummy, setDummy] = useState(null);
    const [newMatch, setNewMatch] = useState({});
    const [alert, setAlert] = useState({ show: false, info: "" });

    useEffect(() => {
        socket.addEventListener("message", function ({ data }) {
            try { data = JSON.parse(data); } catch (error) { return; }
            console.log(data);
            
            if(data.error) {
                return setAlert({
                    show: true,
                    info: data.error
                });
            }

            if(data.private_match) {
                const pm = data.private_match;

                if(pm.match) setMatch(pm.match);
                if(pm.queue) setQueue(pm.queue);
                if(pm.players) setPlayers(pm.players);
                if(pm.canJoin) setCanJoin(pm.canJoin);
            }
        });
    }, [loadData]);

    const RenderCreateMatch = () => {
        return (
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-username">Username</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl                 
                value={newMatch?.username} 
                onChange={(e) => {
                  const nm = { ...match };
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
                value={match?.password} 
                onChange={(e) => setDummy(e.target.value)}
                placeholder="Auto Generated" 
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  checked={match?.subOnly} 
                  onChange={(e) => setDummy(e.target.checked)}
                />
              </InputGroup.Prepend>
              <FormControl 
                value={match?.subOnly ? "Subscribers only" : "Everyone"}
                disabled
              />
            </InputGroup>
            <Button 
                variant="secondary" 
                type="button"
                onClick={ () => socketRequest("error")} 
                style={{width:"100%"}}
            > Submit </Button>
          </div>
        );
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
          </Col>

          <Col className="r-col">
            <Card>
              <Card.Header>Match</Card.Header>
              <Card.Body>
                { match && 
                  JSON.stringify(match)
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>  

        <br/>

        <Row className="r-row">
          <Col className="r-col">
            <Card>
              <Card.Header>QUEUE</Card.Header>
              <Card.Body>
                { queue && 
                  JSON.stringify(queue)
                }
              </Card.Body>
            </Card>
          </Col>

          <Col className="r-col">
            <Card>
              <Card.Header>Start</Card.Header>
              <Card.Body>
                { players && 
                  JSON.stringify(players)
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    )

    function socketRequest(request, data) {
      if(!request) return;
      request = request.toUpperCase();
      const reqBody = { request };
      if(data) reqBody.data = data;
      return socket.send(JSON.stringify(reqBody));
    }
}

export default PrivateMatch;