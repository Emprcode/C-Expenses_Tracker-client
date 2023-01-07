import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) {
      const userObj = JSON.parse(userStr);
      setUser(userObj);
    }
  }, []);

  const handleOnLogout = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <Navbar bg="primary" expand="md">
      <Container>
        <Navbar.Brand href="#">ET</Navbar.Brand>
        Welcome {user.name}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link to="/register" className="nav-link">
                  <i className="fa-solid fa-gauge"></i> Dashboard
                </Link>
                <Link to="/" className="nav-link" onClick={handleOnLogout}>
                  <i className="fa-solid fa-right-to-bracket text-danger "></i>{" "}
                  Logout
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to="/" className="nav-link">
                  <i className="fa-solid fa-right-to-bracket text-danger "></i>{" "}
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  <i className="fa-solid fa-user-pen text-warning"></i> Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
