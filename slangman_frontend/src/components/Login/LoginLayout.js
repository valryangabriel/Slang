import React from 'react';
import Login from '../Login/Login';
import Registration from '../Login/Registration';

const LoginLayout = (props) => {
  console.log('inside LoginLayout: ', props.children)
  return(
    <div className='login-signup-container'>
      <div className='login'>
        <Login 
          handleLogin = {props.handleLogin}
          isLoggedIn = {props.isLoggedIn}
        />
      </div>
      <div className='registration'>
        <Registration
          handleSignUp = {props.handleSignUp}
          isRegistered = {props.isRegistered}
        />
      </div>
    </div>
  )
}

export default LoginLayout
