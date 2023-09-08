import React, {  } from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authnetication";

// import ComposeMail from "./ComposeMail";
// import Inbox from "./Inbox";


function Header() {
  const dispatch = useDispatch();
  // const [showComposeMail, setShowComposeMail] = useState(false);
  // const [showInbox, setInbox] = useState(false);

  const logoutHandler = () => {
    console.log('logout')
    dispatch(authActions.logout());
  };

  // const toggleComposeMail = () => {
  //   setShowComposeMail(!showComposeMail);
  // };

  // const toggleInbox = () => {
  //   setInbox(!showInbox);
  // };

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
          <NavLink className="nav-link" to="/composemail" href="/composemail">
            <h4>Compose Email</h4>
          </NavLink>

        
          <NavLink className="nav-link"  to="/inbox" href="/inbox">
            <h4>Inbox</h4>
          </NavLink>

          <NavLink className="nav-link"  to="/sentbox" href="/sentbox">
          <h4>Sent</h4>
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
          
     </Nav>
     <Nav>
     </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;