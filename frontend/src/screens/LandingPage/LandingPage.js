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
  CardHeader,
  Avatar,
  Grid,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { publicNotes } from "../../actions/notesActions";
import moment from "moment";
import renderHTML from "react-render-html";
import ErrorMessage from "../../components/ErrorMessage";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@mui/private-theming";

const LandingPage = ({ history }) => {
  const theme = createTheme({
    breakpoints: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  });

  const dispatch = useDispatch();

  const publicNote = useSelector((state) => state.publicNote);
  const { loading, notes, error } = publicNote;
  console.log(notes);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/mynotes");
    } else {
      dispatch(publicNotes());
    }
  }, [history]);

  return (
    <>
      <MainScreen title="Public Content">
        <div>
          {loading && <CircularProgress />}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

          <div className="container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                {notes?.reverse().map((note) => {
                  return (
                    <>
                      <div className="mt-4">
                        <Card sx={{ maxWidth: 845 }} style={{ margin: "auto" }}>
                          <div
                            className="card-profile"
                            style={{
                              display: "flex",
                              margin: "0.5rem",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={note.user.pic}
                              alt="user-profile"
                              className="profile-image"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />

                            <div
                              className="card-profile-info"
                              style={{
                                marginLeft: "1rem",
                              }}
                            >
                              <h3
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                {note.user.name}
                              </h3>

                              <p
                                style={{
                                  color: "#616b74",
                                  fontSize: "1rem",
                                }}
                              >
                                {moment(note.createdAt).fromNow()}
                              </p>
                            </div>
                          </div>

                          <hr />
                          <h5
                              style={{
                                margin: "1rem",
                                padding:"1px",
                              
                              }}
                            >
                              {note.title}
                            </h5>
                          <CardContent
                            style={{
                              overflowY: "scroll",
                              overflowX: "scroll",
                            }}
                          >
                            

                            <div
                              style={{
                                width: "800px",
                                height: "250px",
                                whiteSpace: "nowrap",
                                //  overflowY: "scroll",
                                // overflowX:"scroll",
                              }}
                            >
                              <Typography
                          padding={1}
                          margin={1}
                          style={{
                            fontSize: "17px",
                           }}
                        >
                          {renderHTML(note.content)}
                        </Typography>

                              {/* <p
                                style={{
                                  margin: "0.3rem",
                                  fontSize: "17px",
                                }}
                              >
                                {renderHTML(note.content)}
                              </p> */}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MainScreen>
    </>
  );
};

export default LandingPage;
