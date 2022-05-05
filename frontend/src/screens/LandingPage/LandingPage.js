import React, { useEffect } from "react";
import "./LandingPage.css";
import {
  Card,
  Box,
  Container,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import MainScreen from "../../components/MainScreen";

const LandingPage = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history]);

  return (
    <div className="main">
      {/* <Container>
                <Row>
                   <div className="intro-text">
                        <div>
                            <h1 className="title">Welcome to Note App</h1>
                            <p className="subtitle">One safe place for all your notes</p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/login">
                                <Button size='lg' className="landingbutton">
                                    Login
                                </Button>
                            </a>

                             <a href="/register">
                                <Button size='lg' className="landingbutton" variant="outline-primary">
                                    Register
                                </Button>
                            </a>


                        </div>
                   </div>
                </Row>
            </Container> */}
      <MainScreen title="Public Notes">
        <div>
          <Container>
            <div className="mt-2">
                <Card>
              <CardContent>
                <h2>HElo</h2>

                <hr />

                <Typography
                  padding={1}
                  margin={1}
                  style={{
                    fontSize: "20px",
                  }}
                >
                  ddes
                </Typography>
              </CardContent>
            </Card>
            </div>
          
          <div className="mt-2">
                <Card>
              <CardContent>
                <h2>HElo</h2>

                <hr />

                <Typography
                  padding={1}
                  margin={1}
                  style={{
                    fontSize: "20px",
                  }}
                >
                  ddes
                </Typography>
              </CardContent>
            </Card>
            </div>
          </Container>
        </div>
      </MainScreen>
    </div>
  );
};

export default LandingPage;
