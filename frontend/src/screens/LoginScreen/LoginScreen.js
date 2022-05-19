import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  //distructure the userlogin
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("./mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    //call our action
    dispatch(login(email, password));
  };

  return (
    <>
      <section>
        <div
          style={{
            marginTop: "5rem",
          }}
        >
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={submitHandler}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                  />

                  {loading ? (
                    <CircularProgress justify="center" />
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  )}

                  <Grid container>
                    <Grid item xs>
                      <Link variant="body2" to="/reset-password">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="body2" to="/register">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </section>
    </>
  );
};

export default LoginScreen;
