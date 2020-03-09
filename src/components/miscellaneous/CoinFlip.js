import React, { useState, useEffect  } from 'react';
import { Row, Button, Col, Spinner, Form, Container, Card, ProgressBar } from 'react-bootstrap';
import request from "request";

function CoinFlip() {
    const [coinValue, setCoinValue] = useState(false);
    const [spinner, setSpinner] = useState(null);
    const maxPunishment = 1000000;

    const RenderTails = () => {
        let punishment = Math.floor(Math.random() * maxPunishment) + 1;
        const percentage = ((punishment / maxPunishment) * 100).toFixed(1);
        const days = Math.floor(punishment / 86400);
        punishment -= 86400 * days;
        const hours = Math.floor(punishment / 3600);
        punishment -= 3600 * hours;
        const minutes = Math.floor(punishment / 60);
        punishment -= 60 * minutes;
        const seconds = punishment;

        return (
            <div>
                <h1>Tails</h1>
                <h4><b>{ `${days}d ${hours}h ${minutes}min ${seconds}s (${percentage * 10000}s)` }</b> timeout!</h4>
                <ProgressBar 
                    animated 
                    variant="danger"
                    now={percentage} 
                    label={`${percentage}%`}
                    style={{height:"30px"}}
                />
            </div>
        );
    }

    const RenderHeads = () => {
        return (
            <div>
                <h1>Heads</h1>
            </div>
        );
    }

    return(
        <Container>       
            <br />         
            <Card>
                <Card.Header>                    
                    <Button 
                        style={{width:"100%"}}
                        variant="dark" 
                        onClick={() => {
                            const coin = Math.random() <= 0.5;
                            setSpinner(true);
                            setTimeout(() => {
                                setSpinner(false);
                                setCoinValue(coin);
                            }, 1000);

                    }}>Punish</Button>
                </Card.Header>
                <Card.Body>
                    {   spinner !== null && (
                        spinner ? <Spinner animation="border" size="sm" /> :
                        coinValue ? <RenderTails /> : <RenderHeads />)
                    }
                </Card.Body>
            </Card>

      </Container>
    );
}

export default CoinFlip;