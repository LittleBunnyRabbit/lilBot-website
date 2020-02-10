import React, { useState, useEffect  } from 'react';
import { Row, Button, Col, Table, Form, Container } from 'react-bootstrap';
import request from "request";

function Home() {
    return (
        <Container>
            <h4 style={{textAlign:"center", marginTop:"10%"}}>Welcome to lilBot's workshop</h4> 
        </Container>
    )

    async function dataTool(url, {json, headers, method, body}) {
        return new Promise(function (resolve, reject) {
          request({
              headers: headers ? headers : {},
              uri: url,
              method: method ? method : "GET",
              json: json ? json : true,
              body: body ? body : {}
          }, function (error, res, body) {
              if (!error && res.statusCode === 200) resolve(body);
              else reject(error);
          });
        });
    }
}

export default Home;