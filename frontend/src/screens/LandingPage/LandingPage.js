import React, { useEffect, useState } from "react";
import "./LandingPage.css";

import {
  Card,
  Box,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { publicNotes } from "../../actions/notesActions";
import moment from "moment";
import renderHTML from "react-render-html";
import ErrorMessage from "../../components/ErrorMessage";

const LandingPage = ({ history }) => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const publicNote = useSelector((state) => state.publicNote);
  const { loading, notes, error } = publicNote;

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
      <section className="landing-page">
        <div className="container">
          <div className="serarch-text">
            <input
              type="text"
              className="search-box"
              placeholder="Search Notes"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* errors */}
          <div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          </div>

          {/* loading */}
          <div className="loading-style">
            {loading && (
              <>
                <Box mt={10} pl={10} mr={10}>
                  <CircularProgress />
                </Box>
              </>
            )}
          </div>

          {/* Note cards */}
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              {notes
                ?.reverse()
                .filter((filteredNote) =>
                  filteredNote.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((note) => {
                  return (
                    <>
                      <div className="mt-2" key={note._id}>
                         {/* note.content.split(" "). length > 20 ?  */}
                     
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
                              padding: "1px",
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
      </section>
    </>
  );
};

export default LandingPage;
