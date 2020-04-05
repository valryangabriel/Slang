import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  return (
    <div style={{width:'350px'}}>
      {
        props.isLoggedIn
        ?
        <Redirect to='/' />
        :
        <Form onSubmit={props.handleLogin}>
          <h1 style={{fontFamily: 'Abril Fatface'}}> Login </h1>
          <hr/>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="username" name="username" placeholder="username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" placeholder="password" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      }
    </div>
  );
}

export default Login;