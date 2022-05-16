import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import { history, useHistory } from "react-router-dom";
import {
  CardContent,
  Container,
  Typography,
  TextField,
  Checkbox,
  Grid,
  Button,
  Box,
  Avatar,
  FormControlLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createNote.css";

const CreateNote = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [checkpublic, setCheckPublic] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  //for checkbox
  const handleChange = (e) => {
    setCheckPublic(e.target.checked);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !content || !category) return;
    if (content.length < 100) {
      return alert("Can't submit such a short post");
    }

    dispatch(createNoteAction(title, content, category, checkpublic));

    resetHandler();
    history.push("/mynotes");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, []);

  return (
    <>
      {/* <div>
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {loading && <CircularProgress />}
    </div>
      <MainScreen title="Create a Note">
        <div className="">

        
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={submitHandler}
                noValidate
                sx={{ mt: 1 }}
                className="create-note"
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="text"
                  label="Enter Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />

                <ReactQuill
                style={{
                  width:"60rem",
                  height:"30rem",
                   }}
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  name="content"
                  label="Enter Content"
                  value={content}
                  onChange={(e) => setContent(e)}
                  type="text"
                  className="text-editor"                  
                />

                <TextField
               sx={{marginTop:"4rem"}}
                  margin="normal"
                  required
                  fullWidth
                  name="text"
                  label="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                />

                <Box sx={{}}>
                  <Box>
                    <FormControlLabel
                      label="It is public"
                      control={
                        <Checkbox
                          checked={checkpublic}
                          onChange={handleChange}
                        />
                      }
                    ></FormControlLabel>
                  </Box>
                </Box>

                <footer>Creating On - {new Date().toLocaleDateString()}</footer>

                {loading ? (
                  <CircularProgress justify="center" />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create Note
                  </Button>
                )}
              </Box>
            </Box>
          </Container>
          
        </div>
      </MainScreen> */}

      <section className="create-note">
        <div className="container">
          <div className="row">
            <div className="col-10 col-lg-10 col-md-10 ">
              <div className="text-editor">
                <Box
                  component="form"
                  onSubmit={submitHandler}
                  noValidate
                  sx={{ mt: 2 }}
                  className="create-note"
                >

                   <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="text"
                  label="Enter Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />

                  <ReactQuill
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    name="content"
                    label="Enter Content"
                    value={content}
                    onChange={(e) => setContent(e)}
                    type="text"
                    className="text-editor"
                  />

                  <div className="category-inp">
                     <TextField
                sx={{ mt: 7 }}
                  margin="normal"
                  required
                  fullWidth
                  name="text"
                  
                  label="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                />
                  </div>

                  <Box>
                    <FormControlLabel
                      label="It is public"
                      control={
                        <Checkbox
                          checked={checkpublic}
                          onChange={handleChange}
                        />
                      }
                    ></FormControlLabel>
                  </Box>
              

                <footer>Creating On - {new Date().toLocaleDateString()}</footer>

                {loading ? (
                  <CircularProgress justify="center" />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 4 }}
                  >
                    Create Note
                  </Button>
                )}

                

                </Box>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateNote;
