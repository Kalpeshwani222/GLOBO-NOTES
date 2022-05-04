import React,{useState} from 'react'
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage"
import Loading from "../../components/Loading";
import {useDispatch,useSelector} from 'react-redux';
import { createNoteAction } from "../../actions/notesActions";
import {history, useHistory} from "react-router-dom"
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

const CreateNote = () => {

const history = useHistory();

const [title,setTitle] = useState("");
const [content,setContent] = useState("");
const [category,setCategory] = useState("");   

const dispatch = useDispatch();

const noteCreate = useSelector((state) => state.noteCreate);
const {loading,error,note} = noteCreate;
 
const resetHandler = () =>{
    setTitle("");
    setCategory("");
    setContent("");
};


const submitHandler = (e) =>{
    e.preventDefault();
    
    if(!title || !content || !category) return;

    dispatch(createNoteAction(title,content,category));

    
    resetHandler();
    history.push("/mynotes");

};

return (
    <>
        <MainScreen title="Create a Note">
          
                        <div>
                           
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
                onSubmit={submitHandler}
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
                           Creating On - {new Date().toLocaleDateString()}
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
                   Create Note
                  </Button>
                )}

               

                
              </Box>
            </Box>
          </Container>
                            
                        </div>


                   
        </MainScreen>
    </>
  )
}

export default CreateNote