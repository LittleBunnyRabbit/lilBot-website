import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function Queue(props) {
    const [load, setLoad] = useState(null);
    const [ qTable, setQTable ] = useState([ "active" ]);
    const [ qRemoved, setQRemoved ] = useState([]);

    const { joinQueue, leaveQueue, updateOptions, queue, options } = props;
    const [optionsBtns, setOptionsBtns] = useState([]);
    const [qFiltered, setQFiltered] = useState(queue);
    // const [qRemovedFiltered, setQRemovedFiltered] = useState(qRemoved);

    useEffect(() => {
        if(options) {
            console.log({ options });
            
            const op = [];
            if(options.moderator) op.push("moderator");
            if(options.subscriber) op.push("subscriber");
            setOptionsBtns(op);
        }
        setQFiltered(filterQueue(queue));
        setQRemoved(filterQueue(qRemoved));
    }, [load])

    async function handeleOptionsChange(op) { 
        setOptionsBtns(op);
        await updateOptions({
            subscriber: op.includes("subscriber"),
            moderator: op.includes("moderator")
        })
        setQFiltered(filterQueue(queue));
        setQRemoved(filterQueue(qRemoved));
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


          <ToggleButtonGroup 
            type="checkbox" 
            value={ qTable } 
            style={{ width: "100%", marginBottom: "5%" }}
            onChange={value => {
                value = value.filter(v => !qTable.includes(v));
                setQTable(value)
            }}
          >
            <ToggleButton value="active" variant="outline-success" style={{ width:"50%" }}> 
              Active { qFiltered?.length > 0 && ` (${qFiltered.length})`} 
            </ToggleButton>
            <ToggleButton value="removed" variant="outline-danger" style={{ width:"50%" }}> 
              Removed { qRemoved?.length > 0 && ` (${qRemoved?.length})`} 
            </ToggleButton>
          </ToggleButtonGroup>

          { qTable.includes("active")
            ? <QueueTable selectedQueue={ qFiltered } label="X" variant="outline-danger"
                          onClick={ async (id) => {
                              const participant = await queue.find(p => p.id === id);
                              if(!participant) return;
                              const qRemovedNew = [ ...qRemoved ];
                              qRemovedNew.push(participant);
                              setQRemoved(qRemovedNew);
                              return leaveQueue(id);
                          }}/>    
            : <QueueTable selectedQueue={ qRemoved } label="✓" variant="outline-success"                   
                          onClick={ async (id) => {
                              const qRemovedNew = [ ...qRemoved ];
                              const index = qRemovedNew.findIndex(p => p.id === id);
                              if(index === -1) return;
                              const participant = await qRemovedNew.splice(index, 1)[0];
                              if(!participant) return;
                              setQRemoved(qRemovedNew);
                              return joinQueue(participant);
                          }}/>   
          }
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