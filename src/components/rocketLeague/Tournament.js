import React, { useState, useEffect  } from 'react';
import io from 'socket.io-client';
import { 
    Alert, Overlay, Row, Button, 
    ButtonGroup, Col, Card, Table, 
    Form, Container, Tabs, Tab, 
    InputGroup, FormControl, Jumbotron, ToggleButtonGroup, ToggleButton
} from 'react-bootstrap';

const socket = io(`${process.env.REACT_APP_BASE_URL}/rl/tournament`, { 
    query: { username: "abc", password: 12312 } 
});   

function Trounament(props) {
    const [loadData, setLoadData] = useState(true);
    const [tournament, setTournament] = useState({});
    const [newTournament, setNewTournament] = useState({ subsOnly: false, name: "", password: "" }); 
    const [alert, setAlert] = useState({ show: false, info: "" });  
    const [filters, setFilters] = useState([]);

    useEffect(() => {
      socket.on("tournament", (data) => {
          if(!data) return;
          setTournament(data);
      });

      socket.on("reqError", (data) => {
          if(!data) return;
          setAlert({ show: true, info: data.error });
      });

      socket.emit("getTournament");
    }, [loadData]);

    const RenderCreateTournament = () => {
        async function createMatch() {
            socket.emit("createTournament", { 
                name: newTournament?.name, 
                password: newTournament?.password, 
                filters: filters
            });
        }

        return (
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-username">Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl                 
                value={newTournament?.name} 
                style={{boxShadow: "none"}}
                onChange={(e) => {
                  const nt = { ...newTournament }
                  nt.name = e.target.value;
                  setNewTournament(nt);
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-password">Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                value={newTournament?.password} 
                style={{boxShadow: "none"}}
                onChange={(e) => {
                  const nt = { ...newTournament }
                  nt.password = e.target.value;
                  setNewTournament(nt);
                }}
                placeholder="Auto Generated" 
              />
            </InputGroup>
            <ToggleButtonGroup 
                type="checkbox" 
                style={{ width:"100%", marginBottom: "3%" }} 
                value={filters} 
                onChange={(f) => setFilters(f)}
            >
                <ToggleButton 
                    value="subscriber"
                    variant="outline-dark" 
                    style={{ width:"50%" }}
                > Subs </ToggleButton>
                <ToggleButton 
                    value="moderator"
                    variant="outline-dark" 
                    style={{ width:"50%" }}
                > Mods </ToggleButton>
            </ToggleButtonGroup>
            <Button 
                variant="secondary" 
                type="button"
                onClick={ createMatch } 
                style={{width:"100%"}}
                disabled={!newTournament?.name || newTournament?.name.trim() == ""}
            > Submit </Button>
          </div>
        );
    }

    const RenderMatchInfo = () => {
        console.log(tournament);
        
        return (
          <div>
            { tournament?.name && tournament?.password && tournament?.filters &&
              <div>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <td style={{width:"2%"}}>Name</td>
                      <td>{ tournament?.name }</td>
                    </tr>
                    <tr>
                      <td style={{width:"2%"}}>Password</td>
                      <td>{ tournament?.password }</td>
                    </tr>
                    <tr>
                      <td style={{width:"2%"}}>Filters</td>
                      <td>{ tournament?.filters.join(", ") }</td>
                    </tr>
                  </tbody>
                </Table>
                <ButtonGroup aria-label="Basic example" style={{width:"100%"}}>
                  <Button variant="secondary" style={{width:"100%"}} onClick={ () => {
                      socket.emit("deleteTournament");
                  }}> Remove </Button>
                </ButtonGroup>
              </div>
            }
          </div>
        );
    }

    return (
        <Container>
            <br />
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
                        { RenderCreateTournament() }
                    </Card.Body>
                    </Card>
                </Col>

                <Col className="r-col">
                    <Card>
                    <Card.Header>Tournament</Card.Header>
                    <Card.Body>
                        { RenderMatchInfo() }
                    </Card.Body>
                    </Card>
                </Col>
            </Row>  
        </Container>
        
    )
}

export default Trounament;