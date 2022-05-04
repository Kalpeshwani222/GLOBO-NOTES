import React,{useState,useEffect} from 'react'
import axios from 'axios';
import MainScreen from '../components/MainScreen';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';
import { updateNoteAction } from '../actions/notesActions';
import { NavLink,useHistory,useParams } from "react-router-dom";
import { CardContent, Container,
  Typography,
  TextField,
  Checkbox,
  Grid,
  Button,
  Box,
  Avatar,
  FormControlLabel,
  FormControl,
  CircularProgress} from '@mui/material';
  import CssBaseline from "@mui/material/CssBaseline";



function SingleNote (){

  const history = useHistory();

  const {id} = useParams("");

  const[title,setTitle] = useState();
  const [content,setContent] = useState();
  const [category,setCategory] = useState();
  const [date,setDate] = useState();

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
    };

    fetching();
  }, [id,date]);




  const updateHandler = (e) => {
     e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;
  
    history.push("/mynotes");
  };
    return (
      <>
        <MainScreen title="Edit Note">
          {/* <form onSubmit={updateHandler}>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            <br /><br/>
            <input type='text' placeholder='Enter the title'
                    value={title} onChange={(e) =>setTitle(e.target.value)} />
                <br /><br/>
            <input type='text' placeholder='Enter the Content'
                    value={content} onChange={(e) =>setContent(e.target.value)} />
         <br /><br/>

         <textarea rows="6" cols="50" placeholder='Enter the Content'
                    value={category} onChange={(e) =>setCategory(e.target.value)} />
                     <footer>
            Update On - {date.substring(0,10)}
        </footer>
         <br />

        {loading && <Loading size={50} />}

        <Button variant="primary" type="submit">
              Update Note
            </Button>
        </form>       */}

          <div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
{loading && <Loading size={50} />}
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
                <Box
                  component="form"
                  onSubmit={updateHandler}
                  noValidate
                  sx={{ mt: 1 }}
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

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    name="content"
                    label="Enter Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    rows={4}
                    maxRows={10}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="text"
                    label="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                  />

                  <footer>
                    Updating On - {new Date().toLocaleDateString()}
                  </footer>

                  {loading ? (
                    <CircularProgress justify="center" />
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Update Note
                    </Button>
                  )}
                </Box>
              </Box>
            </Container>
          </div>
        </MainScreen>
      </>
    );
}

export default SingleNote