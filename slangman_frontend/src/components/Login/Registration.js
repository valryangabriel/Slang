import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Registration = (props) => {
  return(
    <div style={{width:'350px'}}>
      {
        props.isRegistered
        ?
          <Redirect to='/login' />
        :
         <>
          <h1 style={{fontFamily: 'Abril Fatface'}}> Registration </h1>
          <hr/>
          <Form onSubmit={props.handleSignUp}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name='fname' type="text" placeholder="example: John" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name='lname' type="text" placeholder="example: Doe" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control name='username' type="text" placeholder="example: Gubzy" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name='pw' type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </>
      }
    </div>
  )
}

export default Registration
