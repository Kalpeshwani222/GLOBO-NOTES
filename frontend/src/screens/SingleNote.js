import React,{useState,useEffect} from 'react'
import axios from 'axios';
import MainScreen from '../components/MainScreen';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';
import { updateNoteAction } from '../actions/notesActions';
import { NavLink,useHistory,useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
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
    {/* <MainScreen title="Edit Note"></MainScreen> */}
        <form onSubmit={updateHandler}>
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
         <br /><br/>

        {loading && <Loading size={50} />}

        <Button variant="primary" type="submit">
              Update Note
            </Button>
        </form>      

        {/* <footer>
            Update On - {date.substring(0,10)}
        </footer> */}
    </>
  )
}

export default SingleNote