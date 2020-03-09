import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, ToggleButtonGroup, ToggleButton, Alert } from 'react-bootstrap';

function Queue(props) {
    const [load, setLoad] = useState(null);
    const { leaveQueue, queue, setFilters, filters } = props;

    useEffect(() => {
      console.log("render");

    }, [load])

    return (
        <div>
          <ToggleButtonGroup 
            type="checkbox" 
            style={{ width:"100%", marginBottom: "3%" }} 
            value={filters} 
            onChange={(f) => setFilters(f)}
          >
            <ToggleButton 
              value="subscriber"
              variant="outline-dark" 
              style={{ width:"34%" }}
            > Subs </ToggleButton>
            <ToggleButton 
              value="moderator"
              variant="outline-dark" 
              style={{ width:"34%" }}
            > Mods </ToggleButton>
          </ToggleButtonGroup>
          { console.log("%cRENDERING QUEUE", "font-size: 20px; background: white;") }
          <QueueTable selectedQueue={ queue.filter(p => {
              for(const f of filters)  if(!p[f]) return false;
              return true;
            })} 
            label="X" variant="outline-danger" onClick={ leaveQueue }/>   
        </div>
    );

    function QueueTable(props) {
        let { selectedQueue } = props;

        const { label, variant, onClick } = props;
    
        if(!selectedQueue || selectedQueue?.length < 1) return (
          <h4 style={{ textAlign:"center" }}> Empty Queue </h4> 
        );
    
        return (
          <div>
            <Alert variant="secondary">
              <b>{ selectedQueue?.length }</b> participants
            </Alert>
            <div style={{ overflowY: "scroll", maxHeight:`${62 * 7 + 6}px` }}>
              <Table striped bordered>
                <tbody>
                  { 
                    selectedQueue.map((p, i) => {
                        return (
                          <tr>
                            <td className="participants-btn-td">
                              <Button 
                                variant={ variant }
                                onClick={() => onClick(p.id)}
                              > { label } </Button>
                            </td>
                            <td>
                              <p style={{ color: `${ p.moderator ? "green" : p.subscriber ? "purple" : "black"}`}}>
                                {p.moderator ? "⚔️ " : ""}{p.subscriber ? "🥔 " : ""}{ p.username }
                              </p>
                            </td>
                          </tr>
                        );
                    })
                  }
                </tbody>
              </Table>
            </div>
          </div>
        );
    }
}


export default Queue;