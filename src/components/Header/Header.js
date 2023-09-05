import React, { useState } from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authnetication";

import ComposeMail from "./ComposeMail";


function Header() {
  const dispatch = useDispatch();
  const [showComposeMail, setShowComposeMail] = useState(false);

  const logoutHandler = () => {
    console.log('logout')
    dispatch(authActions.logout());
  };

  const toggleComposeMail = () => {
    setShowComposeMail(!showComposeMail);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand   style={{
          fontFamily: "sans-serif",
          fontSize: "2rem",
        }}>
          <h1  style={{ textAlign: 'center' }}>Mail Client Box</h1>
        </Navbar.Brand>
        <div style={{display:'flex',justifyContent:'space-between'}}>
      
        <Nav className="me-auto">
          <NavLink className="nav-link" onClick={toggleComposeMail} >
            <h4>Compose Email</h4>
          </NavLink>

          <NavLink
            to="login"
            href="/login"
            className="nav-link"
            onClick={logoutHandler}
           
          >
            <h4>Logout</h4>
          </NavLink>
        </Nav>
        <Nav className="me-auto"  style={{
          display: "flex",
          justifyContent: "end",
        }}>
        {showComposeMail && <ComposeMail />}  
     </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;