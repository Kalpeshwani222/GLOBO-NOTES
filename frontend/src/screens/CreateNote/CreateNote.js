import React,{useState} from 'react'
import MainScreen from "../../components/MainScreen";
import {Button,Card,Form} from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage"
import Loading from "../../components/Loading";
import {useDispatch,useSelector} from 'react-redux';
import { createNoteAction } from "../../actions/notesActions";
import {history, useHistory} from "react-router-dom"

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
            
                        {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
                        
                       <form onSubmit={submitHandler}>
                            <input type='title' value={title} placeholder="Enter title"
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        
                        <input type='textarea' value={content} placeholder="Enter Content"
                            onChange={(e) => setContent(e.target.value)}
                        />


                        <input type='text' value={category} placeholder="Enter Category"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        {loading && <Loading size={50} />}

                        <button type='submit' >Create Note</button>
                       </form>

                       <footer>
                           Creating On - {new Date().toLocaleDateString()}
                       </footer>
                    
                   
        </MainScreen>
    </>
  )
}

export default CreateNote