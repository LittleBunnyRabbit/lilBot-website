import React, { useState, useEffect, useRef  } from 'react';
import { Container, Row, InputGroup, Button, FormControl, Table, Card } from 'react-bootstrap';

import ErrorAlert from "../common/ErrorAlert";
import CardColumn from "../common/CardColumn";
import Queue from "../common/Queue";

function Poll() {
    const [load, setLoad] = useState(null);
    const [inputRefs, setInputRefs] = useState([]);
    const [polls, setPolls] = useState([]);

    const lastRow = useRef(null)

    useEffect(() => {
      const newPolls = [1, 2, 3].map((p, i) => (
        <tr>
          <td>{ i + 1 }</td>
          <td>
            <input />
          </td>
        </tr>
      ));
      setPolls(newPolls);
    }, [load]);


    return (
      <Container>
        <br />
        <Row className="r-row">
          <CardColumn content={ <CreatePoll /> }/>
        </Row> 
      </Container>
    );

    function CreatePoll(props) {
        
        return (
          <div>
            <Table striped bordered>
              <tbody>
                { polls }
              </tbody>
            </Table>
            <button onClick={() => {
                const pc = [...polls];
                pc.push(
                  <tr>
                  <td> new </td>
                  <td>
                    <input />
                  </td>
                </tr>
                );
                setPolls(pc);
            }}>Click Me</button>
              <button onClick={() => {
                console.log(polls)
            }}>Click Me</button>
          </div>
        );
    }
}

export default Poll;