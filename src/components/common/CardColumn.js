import React from 'react';
import { Col, Card } from 'react-bootstrap';

function CardColumn(props) {
    const { content, title, children } = props;
    return (
      <Col className="r-col">
        <Card>
          { title &&
            <Card.Header>{ title }</Card.Header>
          }
          
          <Card.Body>{ content || children }</Card.Body>
        </Card>
      </Col>
    );
}

export default CardColumn;