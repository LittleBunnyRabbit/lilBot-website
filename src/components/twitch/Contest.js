import React, { useState, useEffect  } from 'react';
import { Container, Row, Col, Button, ToggleButtonGroup, ToggleButton, Card } from 'react-bootstrap';

import ErrorAlert from "../common/ErrorAlert";
import CardColumn from "../common/CardColumn";
import Queue from "../common/Queue";

function Contest() {
    const [load, setLoad] = useState(null);
    const [queue, setQueue] = useState([]);
    const [queueOptions, setQueueOptions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [winner, setWinner] = useState({});

    useEffect(() => {
      setMessages([
        "This is my first msg", 
        "Wow my seconds msg!",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before..."
      ]);
      setWinner({
        username: "lilBunane"
      });
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
      ]);
    }, [load]);

    return (
      <Container>
        <br />
        <Row className="r-row">
          <CardColumn content={ <ContestQueue /> }/>
          <CardColumn content={ <DrawWinner /> }/>
        </Row> 
      </Container>
    );

    function ContestQueue(props) {
        console.log(queueOptions);
        
        return (
          <div>
            <Queue queue={ queue } joinQueue={null} leaveQueue={null}
                  filters={[
                    ["isMod", queueOptions.includes("mods")],
                    ["isSub", queueOptions.includes("subs")]
                  ]}/>
          </div>
        );
    }

    function DrawWinner(props) {
        return (
          <div >
            <Button 
              variant="secondary" 
              type="button"
              style={{width:"100%", marginBottom: "5%"}}
              disabled={ queue?.length < 1 }
            > Submit </Button>

            <Card style={{minHeight: "500px"}}>
              <Card.Body style={{ overflowY: "scroll", paddingTop:"10px", paddingBottom:"10px" }}>
                <ul style={{ listStyleType: "none", paddingLeft: 0, paddingRight: 0, maxWidth:"inherit", display: "inline-block" }}>
                  { !!messages && !!winner &&
                    messages.map(m => (
                      <li style={{ display: "inline-flex", flexDirection: "row" }}>
                        <span style={{ color: "#00asd2", paddingRight: "10px", fontWeight: "bold" }}>
                          { winner.username }:
                        </span>
                        <span>{m}</span>
                      </li>
                    ))
                  }
                </ul>
              </Card.Body>
            </Card>
          </div>
        );
    }
}

export default Contest;