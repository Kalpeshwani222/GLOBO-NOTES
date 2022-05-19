import React, { useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useHistory } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DrawerComp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [openDrawer, setOpenDrawer] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
    setOpenDrawer(false)
  };

  return (
    <>
      <Drawer
        PaperProps={{
          sx: { width: "50%" },
        }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={{ marginTop: "10px" }}>
          {/* <ListItemButton
            to="/login"
            component={Link}
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItemIcon>
          </ListItemButton> */}

          

          {!userInfo ? (
            <>
              <ListItemButton
                to="/register"
                component={Link}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText>Register</ListItemText>
              </ListItemButton>

              <ListItemButton
                to="/login"
                component={Link}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </ListItemButton>
            </>
          ) : (
            <>

            <div>
              <Typography align="center" variant="h6">{userInfo.name}</Typography>
              <img src={userInfo.pic} alt={userInfo.name}
              style={{
                width:"9rem",
                height:"9rem",
                margin:"5px",
                borderRadius:"50%"

              }}
               />
            </div>
           <Divider />


              <ListItemButton
                to="/mynotes"
                component={Link}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
              

              <ListItemButton
                to="/createnote"
                component={Link}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText>Create Note</ListItemText>
              </ListItemButton>

              <ListItemButton
                to="/profile"
                component={Link}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </ListItemButton>

              <ListItemButton
               onClick={logoutHandler}
                // onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
