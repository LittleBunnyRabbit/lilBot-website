import React, { useState, useEffect  } from 'react';
import { Container, Card, ListGroup, Accordion, Button } from 'react-bootstrap';
import {
  getData
} from "../../functions/Universal";

function BotStatus() {
    const [botStatus, setBotStatus] = useState({});

    useEffect(async () => {
        const data = await getData(`${process.env.REACT_APP_BASE_URL}/discord/botStatus/getStatus`, { json: true });
        await setBotStatus(data);
        
    }, []);

    let uptime = botStatus?.uptime;
    if(uptime) {
        uptime = Math.floor(uptime / 1000);
        const days = Math.floor(uptime / 86400);
        uptime -= 86400 * days;
        const hours = Math.floor(uptime / 3600);
        uptime -= 3600 * hours;
        const minutes = Math.floor(uptime / 60);
        uptime -= 60 * minutes;
        const seconds = uptime;
        uptime = `${days}d ${hours}h ${minutes}min ${seconds}s`
    }

    let status = {
        0: "Ready",
        1: "Connecting",
        2: "Reconnecting",
        3: "Idle",
        4: "Nearly",
        5: "Disconnected",
        6: "Waiting for guilds",
        7: "Identifying",
        8: "Resuming"
    }[botStatus?.status || 0]

    return (
      <Container>
        <br />
         <Card>
          <Card.Header>
            { botStatus?.name }
          </Card.Header>
          <Card.Body>
            <Accordion>
              <Card>
                <Card.Header>
                  <b>Status:</b> { status }
                </Card.Header>
              </Card>
              <Card>
                <Card.Header>
                  <b>Uptime:</b> { uptime }
                </Card.Header>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{ padding: "0"}}>
                    <b>Users:</b> { botStatus?.users?.length }
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    { botStatus?.users?.join(", ") }
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{ padding: "0"}}>
                    <b>Channels:</b> { botStatus?.channels?.length }
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>{ botStatus?.channels?.join(", ") }</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="3" style={{ padding: "0"}}>
                    <b>Guilds:</b> { botStatus?.guilds?.length }
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>{ botStatus?.guilds?.join(", ") }</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Card.Body>
        </Card>
      </Container>
    )
}

export default BotStatus;