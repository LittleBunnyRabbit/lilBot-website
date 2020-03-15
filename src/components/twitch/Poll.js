import React, { useState, useEffect, useRef  } from 'react';
import { Container, Row, InputGroup, Button, FormControl, ProgressBar, Card, Col, Badge, Modal, ButtonGroup } from 'react-bootstrap';

import ErrorAlert from "../common/ErrorAlert";

import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_BASE_URL}/twitch/poll`, { 
  query: { username: "abc", password: 12312 } 
}); 

function Poll() {
    const [load, setLoad] = useState(null);
    const [poll, setPoll] = useState({});

    const nameRef = useRef(null);

    const [modalShow, setModalShow] = useState(false);
    const [alert, setAlert] = useState({ show: false, info: "" });  

    useEffect(() => {
        // setPoll({
        //     name: "Which game should I play?",
        //     votes: 123,
        //     options: [
        //       { id: 1, name: "Roblox", votes: 10 },
        //       { id: 2, name: "Rocket League", votes: 50 },
        //       { id: 3, name: "Overwatch", votes: 3 },
        //       { id: 4, name: "Amnesia", votes: 45 },
        //       { id: 5, name: "Minecraft", votes: 18 },
        //     ]
        // });

        socket.on("poll", (data) => !!data && setPoll(data));
        socket.on("reqError", (data) => !!data && setAlert({ show: true, info: data.error }));
        socket.emit("getPoll");
    }, [load]);

    const CreatePollModal = (props) => {
      const [pollCount, setPollCount] = useState(2);
      console.log({ poll });
      
      const createNewPoll = () => {
          const pollInputs = [];
          for (let i = 0; i < pollCount - 1; i++) pollInputs.push(document.getElementById(`poll_${i}`).value);

          socket.emit("createPoll", {
              name: nameRef.current.value,
              options: pollInputs
          });

          props.onHide();
      }
      return (
        <Modal
          {...props}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Poll
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-username">Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl   
                type="input"              
                ref={nameRef}
                style={{boxShadow: "none"}}
              />
            </InputGroup>
            { Array.from(Array(pollCount).keys()).map(i => {
                const styleInput = i !== pollCount - 1 ? {} : {
                    backgroundColor: "#A8A9AB",
                    borderColor: "#A0A5AB"
                }
    
                const styleForm = i !== pollCount - 1 ? {} : {
                  backgroundColor: "#E8E8E8",
                  borderColor: "#A0A5AB",
                }
    
                return (
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text 
                        id="inputGroup-username"
                        style={styleInput}
                      >{i + 1}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl   
                      type="input"              
                      id={`poll_${i}`} 
                      style={{  ...styleForm, boxShadow: "none"}}
                      onChange={(e) => {
                        e.preventDefault()
                        if(e.target.id == `poll_${pollCount - 1}`) {
                          setPollCount(pollCount + 1)
                        }
                      }}
                    />
                  </InputGroup>
                )
              })
            }
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup style={{ width:"100%" }}>
              <Button 
                variant="secondary"               
                onClick={ createNewPoll } 
                style={{ width: "80%" }}
              > Submit </Button>
              <Button 
                style={{ width: "20%" }}
                onClick={props.onHide} 
                variant="danger"
              > Close </Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      );
    }

    const ActivePoll = () => {
        const styles = [
            "primary", "secondary", "success", "danger", "warning", "info"
        ];
        const colorType = styles[Math.floor(Math.random() * styles.length)];
        return (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <h4>{poll.name}</h4>
              <div
                style={{
                  color: "gray",
                  fontSize: "medium"
              }}>
                {poll.votes} votes
              </div>
            </div>
            <br />
            { poll?.options?.sort((a, b) => b.votes - a.votes).map(o => {
                const perc = poll.votes == 0 ? 0 : Math.floor((o.votes / poll.votes) * 100);

                return (
                  <div>
                    <Card
                      style={{
                        marginBottom: "2%"
                      }}
                    >
                      <Card.Body>
                        <Card.Title
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                          }}
                        >
                          <span>
                            <Badge variant={colorType}>{o.id}</Badge>  
                            &nbsp;&nbsp; {o.name}
                          </span>
                          
                          <div
                            style={{
                              color: "gray",
                              fontSize: "medium"
                            }}
                          >
                            {o.votes} votes
                          </div>
                        </Card.Title>
                          <ProgressBar striped variant={colorType} animated 
                            style={{ height: "100%" }}
                            now={perc} 
                            label={`${perc}%`}
                          />
                      </Card.Body>
                    </Card>
                  </div>
                )
              })
            }
          </div>
        )
    }

    return (
      <Container>
        <ErrorAlert target={ this } alert={ alert } setAlert={ setAlert }/>
        <br />
        <CreatePollModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

        <Row className="r-row">
            <Col className="r-col">
                <Card>
                  <Card.Header style={{ 
                    display: "flex", flexDirection: "row", justifyContent: "space-between"
                    }}>
                    <h4>Poll </h4>
                    <Button variant="secondary" onClick={() => setModalShow(true)}>
                      New
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    { ActivePoll() }
                  </Card.Body>
                </Card>
            </Col>
        </Row>  
      </Container>
    )
}

export default Poll;