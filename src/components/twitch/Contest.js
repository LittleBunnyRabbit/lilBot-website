import React, { useState, useEffect, useRef  } from 'react';
import { Container, Row, Alert, Button, ToggleButtonGroup, ToggleButton, Card } from 'react-bootstrap';
import io from 'socket.io-client';
import ErrorAlert from "../common/ErrorAlert";
import CardColumn from "../common/CardColumn";
import Queue from "../common/Queue";

const socket = io(`${process.env.REACT_APP_BASE_URL}/twitch/contest`, { 
  query: { username: "abc", password: 12312 } 
}); 

function Contest() {
    const [load, setLoad] = useState(null);
    const [queue, setQueue] = useState([]);
    const [queueOptions, setQueueOptions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [winner, setWinner] = useState({});
    const [filters, setFilters] = useState([]);
    const [alert, setAlert] = useState({ show: false, info: "" });  

    const queueRef = useRef(null);

    useEffect(() => {
      socket.on("messages", (data) => !!data && setMessages(data));
      socket.on("winner", (data) => !!data && setWinner(data));
      socket.on("queue", (data) => !!data && setQueue(data));
      socket.on("filters", (data) => !!data && setFilters(data));
      socket.on("reqError", (data) => !!data && setAlert({ show: true, info: data.error }));

      socket.emit("getData", {
        messages: true, winner: true, queue: true, filters: true
      })
    }, [load]);

    return (
      <Container>
        <br />
        <ErrorAlert target={ this } alert={ alert } setAlert={ setAlert }/>
        <Row className="r-row">
          <CardColumn content={ <ContestQueue /> } style={{ width: "50%" }} ref={queueRef}/>
          <CardColumn content={ <DrawWinner /> }/>
        </Row> 
      </Container>
    );

    function ContestQueue(props) {
        return (
          <div>
            <Button 
              variant="secondary" 
              type="button"
              style={{width:"100%", marginBottom: "5%"}}
              disabled={ queue?.length < 1 }
              onClick={ () => socket.emit("drawWinner") }
            > DRAW </Button>

           <Queue queue={ queue }
                  leaveQueue={ (id) => console.log(id) }
                  filters={ filters }
                  setFilters={(filters) => socket.emit("setData", { filters })}/>
          </div>
        );
    }

    function DrawWinner(props) {
        return (
          <div>
          <Alert variant="secondary">
            <span style={{ color: `${ winner?.moderator ? "green" : winner?.subscriber ? "purple" : "black"}`, fontWeight: "700"}}>
              {winner?.moderator ? "⚔️ " : ""}{winner?.subscriber ? "🥔 " : ""}{ winner?.username }
            </span>
          </Alert>
            <Card style={{ minHeight: "500px", maxHeight:"500px"}} >
              <Card.Body style={{ overflowY: "scroll", paddingTop:"10px", paddingBottom:"10px" }}>
                <ul style={{ listStyleType: "none", paddingLeft: 0, paddingRight: 0, display: "inline-block" }}>
                  { !!messages && !!winner &&
                    messages.map(m => (
                      <div>
                        <li style={{ display: "inline-flex", flexDirection: "row" }}>
                          <span style={{ 
                            color: `${ winner?.moderator ? "green" : winner?.subscriber ? "purple" : "black"}`, 
                            paddingRight: "10px", 
                            fontWeight: "bold", 
                            flex: "1",
                          }}>
                            { winner?.username }:
                          </span>
                          <span
                            style={{ maxWidth: `${queueRef?.current?.clientWidth ? queueRef?.current?.clientWidth : "400"}px`}}
                          >{m}</span>
                        </li>
                        <br />
                      </div>
                    ))
                  }
                </ul>
                { console.log(queueRef) }
              </Card.Body>
            </Card>
          </div>
        );
    }
}

export default Contest;