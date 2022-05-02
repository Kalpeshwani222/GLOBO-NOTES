import { Navbar,Button,Form,FormControl,Nav,NavDropdown,Container } from 'react-bootstrap';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { logout } from '../../actions/userActions';


const Header = ({setSearch}) => {

  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const {userInfo} = userLogin;

  const logoutHandler = () =>{
    dispatch(logout());
    history.push("/");
  }
    return (
         <Navbar  expand="lg" bg="primary" variant="dark">
      <Container>

        <Navbar.Brand>
        <Link to= "/">Note Application</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="m-auto">
          <Form inline>
            <FormControl type="text" placeholder="Search" 
            onChange={(e) => setSearch(e.target.value)}
            className="mr-sm-2"
            />
          </Form>
        </Nav>
          {userInfo ? 
          <Nav>
               <Nav.Link href="/mynotes">
               <Link to="/mynotes">My Notes</Link>
               </Nav.Link>
                <NavDropdown title={userInfo ? userInfo.name : " ok"} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile" >My Profile</NavDropdown.Item>  
                    
                    
                    <NavDropdown.Item onClick={
                      logoutHandler
                    } >LogOut</NavDropdown.Item>
                </NavDropdown>  
          </Nav> 

          : 
          <Nav>
            <Nav.Link>
               <Link to="/login">Login</Link>
               </Nav.Link>
          </Nav>
          }  
          </Navbar.Collapse>
          </Container>
      
          </Navbar>
    );
}

export default Header
