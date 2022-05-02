import React,{useEffect} from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import{Link,useHistory,NavLink} from 'react-router-dom';
import MainScreen from '../../components/MainScreen'
import {useDispatch,useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage"


const MyNotes = ({search}) => {

    const dispatch = useDispatch();
    const noteList = useSelector(state => state.noteList);
    const {loading,notes,error} = noteList;
     
    const userLogin = useSelector (state => state.userLogin);
    const{userInfo} = userLogin;

const noteCreate = useSelector((state) => state.noteCreate);
const {success: successCreate} = noteCreate;


//gets updated notes

const noteUpdate = useSelector((state) => state.noteUpdate);
const { success: successUpdate } = noteUpdate; 

//delete the notes
const noteDelete = useSelector(state =>state.noteDelete)
const {loading:loadingDelete,error:errorDelete,success:successDelete} = noteDelete;

const deleteHandler = (id) =>{
        if(window.confirm("are you sure")){
            dispatch(deleteNoteAction(id));
        }
    };

   
const history = useHistory();

    useEffect(() => {
       dispatch(listNotes());
       if(!userInfo){
           history.push("/");
       }
    }, [dispatch,successCreate,history,userInfo,successUpdate,successDelete]);


    return (
        <MainScreen title={`Welcome Back ${userInfo ? userInfo.name : "ok"}`}>
         <Link to="createnote">
             <Button style={{
                 marginLeft:10,
                 marginBottom: 6
             }} size="lg" >
                 Create New Note
              </Button> </Link>
             {errorDelete && (<ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>)}
             {loadingDelete && <Loading/>}
             {error && <ErrorMessage variant='danger'>{error}</ErrorMessage> }
             {loading && <Loading />}
                {
                    notes?.reverse()
                    .filter((filteredNote) =>
                    filteredNote.title.toLowerCase().includes(search.toLowerCase()))
                    .map(note=>(

                    <Accordion key={note._id}>
                            <Card style={{margin:10}}>
                  <Card.Header style={{display:"flex"}}>
                     <span style={{
                         color:"black",
                         textDecoration:"none",
                         flex:1,
                         cursor:"pointer",
                         alignSelf:"center",
                         fontSize:18,
                     }}>

                     <Accordion.Toggle as ={Card.Text} variant='link' eventKey='0'>
                     {note.title}
                     </Accordion.Toggle>
                        
                     </span>   
                  
                  <div>
                      {/* <Button href={`/note/${note._id}`}>Edit</Button> */}
                      <NavLink to={`/note/${note._id}`}>
                            <button className="btn btn-primary">
                              Edit
                            </button>
                          </NavLink>

                         <Button variant='danger' className="mx-2" onClick={()=>deleteHandler(note._id)}>
                         Delete
                         </Button>
                  </div>
                  </Card.Header>

                  <Accordion.Collapse eventKey='0'>
                        <Card.Body>
                       <h4>
                         <Badge variant='success'>
                             category - {note.category}
                         </Badge>
                     </h4>
                       <blockquote className='blockquote mb-0'>
                            <p>
                           {note.content}

                            <footer className='blockquote-footer'>
                               Created On {" "}
                               <cite title="Source Title">
                                   {note.createdAt.substring(0,10)}
                               </cite>
                            </footer>
                        </p>
                        </blockquote>
                  </Card.Body>
                  </Accordion.Collapse>
                      
                  
              </Card>
                    </Accordion>
                         
                    
                    ))
                }
              
        
        </MainScreen>
    )
}

export default MyNotes
