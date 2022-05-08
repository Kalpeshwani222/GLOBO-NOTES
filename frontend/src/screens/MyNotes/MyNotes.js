import React, { useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  Button,
  CardActionArea,
  CardActions,
  IconButton,
  CircularProgress,
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import renderHTML from 'react-render-html';

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  //gets updated notes

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  //delete the notes
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const history = useHistory();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <>
      <MainScreen title={`Welcome Back ${userInfo ? userInfo.name : "ok"}`}>
        <div>
          {/* #ffc107 */}
          <Link to="createnote">
            <Fab
              color="secondary"
              aria-label="edit"
              style={{
                margin: 0,
                top: "auto",
                right: 20,
                bottom: 20,
                left: "auto",
                position: "fixed",

                backgroundColor: "#ffc400",
              }}
            >
              <EditIcon />
            </Fab>
          </Link>

          {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
          )}
          {loadingDelete && <Loading />}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}

          <Container>
            <Grid container spacing={2}>
              <>
                {notes
                  ?.reverse()
                  .filter((filteredNote) =>
                    filteredNote.title
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((note) => (
                    <Grid item sm={6} xs={12} lg={4}>
                      <Box textAlign="center">
                        <Card sx={{ maxWidth: 345 }}>
                          <div>
                            <h2
                              style={{
                                alignItems: "start",
                                display: "flex",
                                margin: " 8px",
                              }}
                            >
                              {note.title}
                            </h2>
                          </div>

                          <hr />

                          <div
                            style={{
                              width: "338px",
                              height: "250px",
                              overflowY: "scroll",
                            }}
                          >
                            <p
                              style={{
                                margin: "6px",
                                padding: "5px",
                                fontSize: "17px",
                              }}
                            >
                            {renderHTML(note.content)}
                              
                            </p>
                          </div>
                          <div style={{}}>
                            <p
                              style={{
                                margin: "1rem",
                              }}
                            >
                              <footer className="blockquote-footer">
                                Created On - 
                                <cite title="Source Title">
                                  {note.createdAt.substring(0, 10)}
                                </cite>
                              </footer>
                            </p>
                          </div>
                          <hr />
                          <CardActions>
                          
                            <Link to={`/note/${note._id}`}>
                              <Fab
                                color="primary"
                                aria-label="edit"
                                size="small"
                              >
                                <EditIcon />
                              </Fab>
                            </Link>

                            <Fab
                              color="secondary"
                              aria-label="edit"
                              size="small"
                              style={{ background: "red" }}
                              onClick={() => deleteHandler(note._id)}
                            >
                              <DeleteIcon />
                            </Fab>
                          </CardActions>
                        </Card>
                      </Box>
                    </Grid>
                  ))}
              </>
            </Grid>
          </Container>
        </div>
      </MainScreen>
    </>
  );
};

export default MyNotes;
