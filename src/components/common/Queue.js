import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function Queue(props) {
    const [load, setLoad] = useState(null);
    const [ qTable, setQTable ] = useState([ "active" ]);
    const [ qRemoved, setQRemoved ] = useState([]);

    const { queue, joinQueue, leaveQueue, filters } = props;

    const [qFiltered, setQFiltered] = useState(queue);
    const [qRemovedFiltered, setQRemovedFiltered] = useState(qRemoved);

    useEffect(() => {
      if(filters) {
        const filter = (q) => (
          q.filter(p => {
            for(const f of filters) {
                if(f[1] && !p[f[0]]) return false;
            }
            return true;
          })
        );
        setQFiltered(filter(queue));
        setQRemovedFiltered(filter(qRemoved));
      }
    }, [load])


    return (
        <div>
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
              Removed { qRemovedFiltered?.length > 0 && ` (${qRemovedFiltered.length})`} 
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
            : <QueueTable selectedQueue={ qRemovedFiltered } label="✓" variant="outline-success"                   
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
    
        if(selectedQueue?.length < 1) return (
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
                            <p style={{ color: `${ p.isMod ? "green" : p.isSub ? "purple" : "black"}`}}>
                              {p.isMod ? "⚔️ " : ""}{p.isSub ? "🥔 " : ""}{ p.username }
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