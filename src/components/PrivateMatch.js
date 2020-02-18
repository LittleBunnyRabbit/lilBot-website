import React, { useState, useEffect  } from 'react';
import { Row, Button, ButtonGroup, Col, Card, Table, Form, Container, Tabs, Tab, InputGroup, FormControl, Jumbotron } from 'react-bootstrap';
import "../css/PrivateMatch.css";
import request from "request";

const socket = new WebSocket('ws://localhost:12312');

function PrivateMatch() {
    const [loadData, setLoadData] = useState(true);
    const [matchInfo, setMatchInfo] = useState({});
    const [removedParicipants, setRemovedParicipants] = useState([]);
    const [participants, setParicipants] = useState([]);
    const [passwordLength, setPasswordLength] = useState(5);
    const [players, setPlayers] = useState([]);
    const [matchUsername, setMatchUsername] = useState(null);
    const [matchPassword, setMatchPassword] = useState(null);
    const [matchSubs, setMatchSubs] = useState(false);
    const [displayParticipants, setDisplayParticipants] = useState(true);

    useEffect(() => {
        console.log("PrivateMatch");
        updateAll().then(() => {
          console.log("Private Match");
        });
        const socket = new WebSocket('ws://localhost:6901');

        // socket.addEventListener('open', function (event) {
        //     socket.send('Hello Server!');
        // });

        socket.addEventListener('message', function (event) {
            setMatchUsername(event.data)
            console.log('Message from server ', event.data);
        });
    }, [loadData]);

    return (
      <Container>
        <br/>
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
                { RenderMatchInfo() }
              </Card.Body>
            </Card>
          </Col>
        </Row>  
        <br/>
        <Row className="r-row">
          <Col className="r-col">
            <Card>
              <Card.Header>Participants</Card.Header>
              <Card.Body>
                { RenderParticipants() }
              </Card.Body>
            </Card>
          </Col>

          <Col className="r-col">
            <Card>
              <Card.Header>Start</Card.Header>
              <Card.Body>
                { RenderStartMatch() }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )

    function RenderCreateMatch() {
      return (
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-username">Username</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl                 
              value={matchUsername} 
              onChange={(e) => setMatchUsername(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-password">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
              value={matchPassword} 
              onChange={(e) => setMatchPassword(e.target.value)}
              placeholder="Auto Generated" 
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Checkbox
                checked={matchSubs} 
                onChange={(e) => setMatchSubs(e.target.checked)}
              />
            </InputGroup.Prepend>
            <FormControl 
              value={matchSubs ? "Subscribers only" : "Everyone"}
              disabled
            />
          </InputGroup>
          <Button 
              variant="secondary" 
              type="button"
              onClick={updateMatchInfo} 
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
                <td>{ matchInfo.username }</td>
              </tr>
              <tr>
                <td style={{width:"2%"}}>Password</td>
                <td>{ matchInfo.password }</td>
              </tr>
              <tr>
                <td style={{width:"2%"}}>Type</td>
                <td>{ matchInfo.subsOnly ? "Subscribers only" : "Everyone" }</td>
              </tr>
            </tbody>
          </Table>
          <Button 
            variant="secondary" 
            type="button"
            onClick={updatePassword} 
            style={{width:"100%"}}
          > New Password </Button>
        </div>
      );
    }

    function RenderParticipants() {
      const removeParticipant = async (id) => {
        const participant = participants.find(p => p.id === id);
        const removedParicipantsNew = [...removedParicipants];
        removedParicipantsNew.push(participant);
        await dataTool(
          "http://localhost:6969/stores/private-matches/leaveMatch", 
          { json: true, method: "DELETE", body: { id } }
        );
        await updateParticipants();
        setRemovedParicipants(removedParicipantsNew);
      }

      const addParticipant = async (id) => {
        const removedParicipantsNew = [...removedParicipants];
        const index = removedParicipantsNew.findIndex(p => p.id === id);
        if(index === -1) return;
        const participant = removedParicipantsNew.splice(index, 1)[0];
        setRemovedParicipants(removedParicipantsNew);
        await dataTool(
          "http://localhost:6969/stores/private-matches/joinMatch", 
          { json: true, method: "POST", body: participant }
        );
        await updateParticipants();
      }

      const emptyTable = (
        <Table striped bordered hover>
          <thead>
            <tr><th style={{ textAlign: "center" }}>Empty</th></tr>
          </thead>
        </Table>
      );

      return (
        <div>
          <ButtonGroup aria-label="Basic example" style={{width:"100%"}}>
            <Button variant="secondary" style={{width:"50%"}} onClick={updateParticipants}> Refresh </Button>
            <Button variant="secondary" style={{width:"50%"}} onClick={clearParticipants} > Clear </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Basic example" style={{width:"100%",  marginTop:"5%", marginBottom:"5%"}}>
            <Button variant="outline-success" style={{width:"50%"}} onClick={() => setDisplayParticipants(true)}> Active </Button>
            <Button variant="outline-danger" style={{width:"50%"}} onClick={() => setDisplayParticipants(false)} > Removed </Button>
          </ButtonGroup>

          { displayParticipants && (participants.length > 0 ? ParticipantsTable() : emptyTable) }
          { !displayParticipants && (removedParicipants.length > 0 ? RemovedParicipantsTable() : emptyTable) }
        </div>
      );

      function ParticipantsTable() {
        return (
          <Table striped bordered hover>
            <tbody>
              { 
                participants.map((p, i) => {
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
  
      function RemovedParicipantsTable() {
        return (
          <Table striped bordered hover>
            <tbody>
              { 
              removedParicipants.map((p, i) => {
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

    function RenderStartMatch() {
      const addPlayer = async (id) => {
        const playersNew = [...players];
        const index = playersNew.findIndex(p => p.id === id);
        if(index === -1) return;
        const participant = playersNew.splice(index, 1)[0];
        setPlayers(playersNew);
        console.log(participant);
        
        await dataTool(
          "http://localhost:6969/stores/private-matches/joinMatch", 
          { json: true, method: "POST", body: participant }
        );
        await updateParticipants();
      }

      return (
        <div>
          <Button
            variant="secondary" 
            style={{width:"100%"}}
            onClick={startMatch}
          > Start Match </Button>
          <Table striped bordered hover style={{marginTop:"5%"}}>
            <tbody>
              {
                players.map(p => {
                  return (
                    <tr>
                      <td className="participants-btn-td">
                        <Button 
                          variant="outline-success" 
                          onClick={() => addPlayer(p.id)}
                        > ← </Button>
                      </td>
                      <td>{p.username}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      );
    }

    async function startMatch() {
      await dataTool("http://localhost:6969/stores/private-matches/startMatch", { json:true });
      await updateAll();
    }

    async function updateAll() {
      return await dataTool(
        "http://localhost:6969/stores/private-matches", 
        { json:true }).then((data) => {
          setMatchInfo({
            username: data.match.username,
            password: data.match.password,
            subsOnly: data.match.subsOnly
          });
          setParicipants(data.participants);
          setPlayers(data.players);
        }
      );
    }

    async function updateParticipants() {
      return await dataTool(
        "http://localhost:6969/stores/private-matches/getParticipants", 
        { json: true }
      ).then((data) => {
        setParicipants(data.participants);
      });
    }

    async function clearParticipants() {
      await dataTool(
        "http://localhost:6969/stores/private-matches/setParticipants", 
        { json: true, method: "POST", body: { participants: [] } }
      );
      await updateParticipants();
      setRemovedParicipants([]);
    }

    async function dataTool(url, {json, headers, method, body}) {
        return new Promise(function (resolve, reject) {
          request({
              headers: headers ? headers : {},
              uri: url,
              method: method ? method : "GET",
              json: json ? json : true,
              body: body ? body : {}
          }, function (error, res, body) {
              if (!error && res.statusCode === 200) resolve(body);
              else reject(error);
          });
        });
    }

    async function updateMatchInfo(e) {
      if(e) await e.preventDefault();
      await dataTool( "http://localhost:6969/stores/private-matches/createMatch", 
        { json: true, method: "POST", body: {
        username: matchUsername,
        password: matchPassword,
        subsOnly: matchSubs,
        length: passwordLength
      }});
      await updateAll();
    }

    async function updatePassword() {
      await dataTool( "http://localhost:6969/stores/private-matches/updatePassword", 
        { json: true, method: "POST", body: {
        password: matchPassword,
        length: passwordLength
      }});
      await updateAll();
    }

    function socketRequest(request, data) {
      if(!request) return;
      request = request.toUpperCase();
      const reqBody = { request };
      if(data) reqBody.data = data;
      return socket.send(JSON.stringify(reqBody));
    }
}

export default PrivateMatch;