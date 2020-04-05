import React from 'react'
import { 
  Navbar,
  Nav,
} from 'react-bootstrap';

const Navigation = (props) => {


  return(
    <div>
      {
        props.isLoggedIn
        ?
        <Navbar bg="dark">
        <Navbar.Brand href="/" style={{color:'white', fontFamily:'Abril Fatface'}}>Slang</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/login" onClick={props.handleLogout} style={{color:'white', fontFamily:'Abril Fatface',}}>Logout</Nav.Link>
          <Nav.Link href="/categories" style={{color:'white', fontFamily:'Abril Fatface',}}>Categories</Nav.Link>
        </Nav>
        </Navbar>
        :
        <Navbar bg="dark">
          <Navbar.Brand href="/" style={{color:'white', fontFamily:'Abril Fatface',}}>Slang</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/login" style={{color:'white', fontFamily:'Abril Fatface',}}>Login</Nav.Link>
          </Nav>
        </Navbar>
      }
    </div>
  )
}

export default Navigation