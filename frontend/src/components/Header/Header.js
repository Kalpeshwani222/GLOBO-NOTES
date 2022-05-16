import { Nav, NavDropdown } from "react-bootstrap";
import React, {  useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = () => {
  const [show, setShow] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  

  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-light"
        style={{ height: "4.5rem", background: "#ffc107" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/mynotes">
            NoteApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userInfo ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/mynotes"
                      style={{ fontSize: "19px" }}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/createnote"
                      style={{ fontSize: "19px" }}
                    >
                      Create Note
                    </Link>
                  </li>


                  


                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="nav-link"
                      to="/login"
                      style={{ fontSize: "19px" }}
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="nav-link"
                      to="/register"
                      style={{ fontSize: "19px" }}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>

                {!userInfo ? ""
                :<>
                  <span class="navbar-text">
              <Nav>
                <Nav.Link href="/mynotes">
                  <Link
                    className="nav-link"
                    to="/mynotes"
                    style={{ fontSize: "19px" }}
                  >
                    My Notes
                  </Link>
                </Nav.Link>

                <NavDropdown
                  title={userInfo ? userInfo.name : " ok"}
                  id="basic-nav-dropdown"
                  style={{
                    margin: "0.5rem",
                    fontSize: "18px",
                  }}
                >
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </span>
                </>
                }
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
