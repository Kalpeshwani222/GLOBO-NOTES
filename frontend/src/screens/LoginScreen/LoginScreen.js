import React,{useState,useEffect} from 'react'
import MainScreen from '../../components/MainScreen';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import {history} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../../actions/userActions';


const LoginScreen = ({history}) => {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState("");
    // const[error,setError] = useState(false);  
    // const[loading,setLoading]=useState(false);

   const  dispatch = useDispatch();

    const userLogin  = useSelector(state => state.userLogin);

    //distructure the userlogin
    const {loading,error,userInfo} = userLogin;

    
    useEffect(() => {
     if(userInfo){
       history.push("./mynotes");
     }
    }, [history,userInfo]);


    const submitHandler =async (e)=>{
        e.preventDefault();

        //call our action 
        dispatch(login(email,password));



        // try {
        //     const config = {
        //         Headers : {
        //             "Content-type":"applications/json"
        //         }
        //     }

        //         setLoading(true);

        //         const {data} = await axios.post('/api/users/login',{
        //             email,password
        //         },config);
        //         console.log(data);
        //     localStorage.setItem("userInfo",JSON.stringify(data));

        //         setLoading(false);

        // } catch (error) {
        //     setError(error.response.data.message);
        //     setLoading(false);
        // }
    }

    return (
        <MainScreen title='Login'>
       
            <section className="login_page">
        <div className="container">
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading/>}
          <form className="mt-5" onSubmit={submitHandler}>

            <div className="row">

              <div className="mb-3 col-lg-12 col-md-12 col-12 col-lg-6 col-md-6 col-12">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  name="email"
                  placeholder="Enter Email"
                />
              </div>

              <div className="mb-3 col-lg-12 col-md-12 col-12">
                <label for="exampleFormControlInput1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="exampleFormControlInput1"
                  placeholder="***************"
                />
              </div>

            <button type="submit"  className="btn btn-primary">Submit</button>
            </div>
          </form>

          New Customer ? <Link to="/register">Register Here</Link>
        </div>
      </section>
            
        </MainScreen>
    )
}

export default LoginScreen
