import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authnetication";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand
          style={{
            fontFamily: "sans-serif",
            fontSize: "2rem",
          }}
        >
          <h1
          style={{textAlign:'center'}}
          >
            Mail Client Box
          </h1>
       

        <Nav className="me-auto m-6">
          
          {!isLoggedIn && (
            <Link
              to="login"
              className="text-light text-decoration-none m-2"
              onClick={logoutHandler}
            >
              Logout
            </Link>
          )}
        </Nav>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;