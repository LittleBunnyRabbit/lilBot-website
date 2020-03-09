import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function Queue(props) {
    const [load, setLoad] = useState(null);
    const { leaveQueue, updateOptions, queue, options } = props;
    const [optionsBtns, setOptionsBtns] = useState([]);
    const [qFiltered, setQFiltered] = useState(queue);

    useEffect(() => {
        if(options) {
            console.log({ options });
            
            const op = [];
            if(options.moderator) op.push("moderator");
            if(options.subscriber) op.push("subscriber");
            setOptionsBtns(op);
        }
        setQFiltered(filterQueue(queue));
    }, [load])

    async function handeleOptionsChange(op) { 
        setOptionsBtns(op);
        await updateOptions({
            subscriber: op.includes("subscriber"),
            moderator: op.includes("moderator")
        })
        setQFiltered(filterQueue(queue));
    }

    function filterQueue(q) {
        console.log({optionsBtns});
        console.log({options});
        if(!q) return q;
        return q.filter(p => {
          if(optionsBtns.includes("moderator") && !p.moderator) return false;
          if(optionsBtns.includes("subscriber") && !p.subscriber) return false;
          return true;
        });
    }

    return (
        <div>
          <ToggleButtonGroup 
            type="checkbox" 
            style={{ width:"100%", marginBottom: "5%" }} 
            value={optionsBtns} 
            onChange={handeleOptionsChange}
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

          <QueueTable selectedQueue={ qFiltered } label="X" variant="outline-danger" onClick={ leaveQueue }/>   
        </div>
    );

    function QueueTable(props) {
        let { selectedQueue } = props;

        const { label, variant, onClick } = props;
    
        if(!selectedQueue || selectedQueue?.length < 1) return (
          <h4 style={{ textAlign:"center" }}> Empty Queue </h4> 
        );
    
        return (
          <div style={{ overflowY: "scroll", maxHeight:`${62 * 8 + 6}px` }}>
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
        );
    }
}


export default Queue;