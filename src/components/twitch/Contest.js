import React, { useState, useEffect  } from 'react';
import { Container, Row, Alert, Button, ToggleButtonGroup, ToggleButton, Card } from 'react-bootstrap';

import ErrorAlert from "../common/ErrorAlert";
import CardColumn from "../common/CardColumn";
import Queue from "../common/Queue";

function Contest() {
    const [load, setLoad] = useState(null);
    const [queue, setQueue] = useState([]);
    const [queueOptions, setQueueOptions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [winner, setWinner] = useState({});
    const [filters, setFilters] = useState([]);

    useEffect(() => {
      setMessages([
        "This is my first msg", 
        "Wow my seconds msg!",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
        "This is a super long msg because i need to test if it will overflow into the next line or it will just break everything like it did before...",
      ]);
      setWinner({
        username: "lilBunane", subscriber: true, moderator: true, id:"1"
      });
      setQueue([
        { username: "Player_1", subscriber: false, moderator: true, id:"1"},
        { username: "Player_2", subscriber: false, moderator: false, id:"2"},
        { username: "Player_3", subscriber: true, moderator: false, id:"4"},
        { username: "Player_4", subscriber: true, moderator: true, id:"5"},
        { username: "Player_5", subscriber: false, moderator: false, id:"6"},
        { username: "Player_6", subscriber: false, moderator: true, id:"7"},
        { username: "Player_7", subscriber: true, moderator: true, id:"8"},
        { username: "Player_8", subscriber: true, moderator: true, id:"9"},
        { username: "Player_9", subscriber: false, moderator: false, id:"10"},
        { username: "Player_10", subscriber: true, moderator: true, id:"11"},
        { username: "Player_11", subscriber: true, moderator: false, id:"12"},
        { username: "Player_12", subscriber: true, moderator: true, id:"13"},
        { username: "Player_13", subscriber: false, moderator: false, id:"14"},
        { username: "Player_14", subscriber: true, moderator: true, id:"15"},
        { username: "Player_15", subscriber: false, moderator: true, id:"160"}
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
            <Button 
              variant="secondary" 
              type="button"
              style={{width:"100%", marginBottom: "5%"}}
              disabled={ queue?.length < 1 }
              onClick={ () => setWinner(queue[Math.floor(Math.random() * queue.length)]) }
            > DRAW </Button>

           <Queue queue={ queue }
                  // leaveQueue={ (id) => socket.emit("leaveQueue", { id }) }
                  leaveQueue={ (id) => console.log(id) }
                  filters={ filters }
                  setFilters={ setFilters }
                  />
          </div>
        );
    }

    function DrawWinner(props) {
        return (
          <div >
          <Alert variant="secondary">
            <span style={{ color: `${ winner?.moderator ? "green" : winner?.subscriber ? "purple" : "black"}`, fontWeight: "700"}}>
              {winner?.moderator ? "⚔️ " : ""}{winner?.subscriber ? "🥔 " : ""}{ winner?.username }
            </span>
          </Alert>
            <Card style={{minHeight: "500px", maxHeight:"500px"}}>
              <Card.Body style={{ overflowY: "scroll", paddingTop:"10px", paddingBottom:"10px" }}>
                <ul style={{ listStyleType: "none", paddingLeft: 0, paddingRight: 0, maxWidth:"inherit", display: "inline-block" }}>
                  { !!messages && !!winner &&
                    messages.map(m => (
                      <li style={{ display: "inline-flex", flexDirection: "row" }}>
                        <span style={{ 
                          color: `${ winner?.moderator ? "green" : winner?.subscriber ? "purple" : "black"}`, 
                          paddingRight: "10px", 
                          fontWeight: "bold", 
                          flex: "1" 
                        }}>
                          { winner?.username }:
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