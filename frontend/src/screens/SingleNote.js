import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import { updateNoteAction } from "../actions/notesActions";
import { useHistory, useParams } from "react-router-dom";
import {
  TextField,
  Checkbox,
  Button,
  Box,
  FormControlLabel,
  FormControl,
  CircularProgress,
  InputLabel,
  MenuItem,
} from "@mui/material";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "@mui/material/Select";

function SingleNote() {
  const history = useHistory();

  const { id } = useParams("");

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();

  const [date, setDate] = useState();

  const [checkpublic, setCheckPublic] = useState(false);
  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
      setCheckPublic(data.public);
    };

    fetching();
  }, [id, date]);

  //for checkbox
  const handleChange = (e) => {
    setCheckPublic(e.target.checked);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category, checkpublic));
    if (!title || !content || !category) return;

    history.push("/mynotes");
  };
  return (
    <>
      <section className="create-note">
        <div className="container">
          <div className="row">
            <div className="col-10 col-lg-10 col-md-10 ">
              <div className="text-editor">
                <Box
                  component="form"
                  onSubmit={updateHandler}
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
                    value={content || ""}
                    onChange={(e) => setContent(e)}
                    type="text"
                    className="text-editor"
                  />

                  <div className="category-inp">
                    {/* <TextField
                sx={{ mt: 7 }}
                  margin="normal"
                  required
                  fullWidth
                  name="text"
                  
                  label="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                /> */}

                    <FormControl fullWidth sx={{ mt: 7 }}>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <MenuItem value={"Programming"}>Programming</MenuItem>
                        <MenuItem value={"Personal"}>Personal</MenuItem>
                        <MenuItem value={"knowledge"}>knowledge</MenuItem>
                      </Select>
                    </FormControl>
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

                  <footer>
                    Creating On - {new Date().toLocaleDateString()}
                  </footer>

                  {loading ? (
                    <CircularProgress justify="center" />
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, mb: 4 }}
                    >
                      update Note
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
}

export default SingleNote;
