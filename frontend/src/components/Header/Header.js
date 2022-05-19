import { Nav, NavDropdown } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { AppBar, Tab, Tabs, useMediaQuery, useTheme,Avatar, MenuItem, Menu } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerComp from "./DrawerComp";

const Header = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();
  

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

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
      {/* <nav
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
      </nav> */}

      <AppBar
        sx={
          {
            // background: "#ffc107",
          }
        }
      >
        <Toolbar>
          <Typography sx={{ fontSize: "1.3rem" }} >NoteApp</Typography>
         
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>

            {userInfo ? (
              <>
                    <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="secondary"
              >
                <Tab label="Home" to="/" component={Link} />
                <Tab label="Create Note"  to="/createnote" component={Link} />
                <Tab label="My Notes" to="/mynotes" component={Link} />
                 
              </Tabs>
              </>
            ) : (
              <>

                <Tab label="Home" to="/" component={Link} />
                
 <Button
              disableElevation
              disableRipple
               sx={{ marginLeft: "auto",
                
                }}
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
                style={{
                  background:'transparent'
                }}
              >Register
                
              </Button>

              <Button
               sx={{ marginLeft: "10px" }}
                component={Link}
               to="/login"
                variant="contained"
                color="primary"
              >Login
                
              </Button>
              </>
            )
            
            
            }

           {!userInfo ? ""
                :<>
                  

                 <Box sx={{ flexGrow: 0 ,marginLeft:'auto'}}>
          
              

                  <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => setShow(!show)}
              >
                <img src={userInfo.pic} alt={userInfo.name}

                  style={{
                    width:"2.5rem",
                    height:"2.5rem",
                   
                          borderRadius:"50%",
                          display:"flex",
                           margin:"auto",
                          padding:"3px"
                  }}
                />
                {/* <Avatar/> */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={show}
                onClose={() => setShow(false)}
                onClick={() => setShow(false)}
              >
                <MenuItem  component={Link}
               to="/profile" >Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
              </Menu>
            </div>
              </Box>
             
            
                </>
                }


  
  
             

             

               
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
