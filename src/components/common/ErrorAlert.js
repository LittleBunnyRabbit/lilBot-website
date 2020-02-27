import React from 'react';
import { Overlay, Alert } from 'react-bootstrap';

function ErrorAlert(props) {
    const { target, alert, setAlert } = props;
    return (
      <Overlay target={ target } show={ alert?.show } placement="right-start">
        <Alert 
          variant="danger" 
          onClose={() => setAlert({ show: false, info: "" })} 
          dismissible
          style={{height: "5%", paddingTop:"1%"}}
        >
          <h5>{ alert?.info }</h5>
        </Alert>
      </Overlay>
    );
}

export default ErrorAlert;