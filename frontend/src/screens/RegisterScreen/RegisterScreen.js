import React,{useState,useEffect} from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { register } from "../../actions/userActions";


const RegisterScreen = () => {

    const[email,setEmail] = useState("");
    const[name,setName] = useState("");
    const[pic,setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    
    const[password,setPassword] = useState("");

    const[confirmpassword,setConfirmPassword] = useState("");
    
    const[message,setMessage] = useState(null);
    const[picMessage,setPicMessage] = useState(null);

    // const[error,setError] = useState(false);
    // const[loading,setLoading] = useState(false);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const {loading,error,userInfo} =  userRegister;


  

    const history = useHistory();

    useEffect(() =>{
      if(userInfo){
        history.push(
          "/mynote",
        );
       
      }
    },[history,userInfo]);
    const submitHandler = async(e) => {
        e.preventDefault();

        if(password!=confirmpassword){
          setMessage("Password do not match");
        }else{
          dispatch(register(name,email,password,pic));
        }
        
    }
    
    
    
// uploading image 
const postDetails = (pics) => {
    if(!pics){
        return setPicMessage("Please Select the image");
    }
    setPicMessage(null);

    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
        const data = new FormData();
        data.append('file',pics);

        data.append('upload_preset','notepad');
        data.append('cloud_name','kalpesh');

        fetch(" https://api.cloudinary.com/v1_1/kalpesh/image/upload",{
            method:'post',
            body:data,
        }).then((res)=>res.json()).then((data)=>{
            console.log(data);
            setPic(data.url.toString());
        }).catch((err) =>{
            console.log(err);
        })
    }else{
        return setPicMessage("please select an Proper image");
    }


}

  return (
    <MainScreen title="Register">
      <section className="register_page">
        <div className="container">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
         
           {loading && <Loading />}
          {
              message && <ErrorMessage variant="danger">{message}</ErrorMessage>
          }
          <form className="mt-5" onSubmit={submitHandler} >
            <div className="row">


              <div className="mb-3 col-lg-12 col-md-12 col-12 col-lg-6 col-md-6 col-12">
                <label for="exampleFormControlInput1" className="form-label">
                    Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="Enter name"
                />
              </div>


                
              <div className="mb-3 col-lg-12 col-md-12 col-12 col-lg-6 col-md-6 col-12">
                <label for="exampleFormControlInput1" className="form-label">
                   Enter Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  id="exampleFormControlInput1475"
                  placeholder="***************"
                />
              </div>

              


               <div className="mb-3 col-lg-12 col-md-12 col-12">
                <label for="exampleFormControlInput1" className="form-label">
                 Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirmpassword"
                  id="exampleFormControlInput1"
                  placeholder="***************"
                />
              </div>


            {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}

               <div className="mb-3 col-lg-12 col-md-12 col-12">
                <label for="exampleFormControlInput1" className="form-label">
                  Profile Picture
                </label>
                <input
                  type="file"
                  className="form-control"
                //   value={password}
                  onChange={(e) => postDetails(e.target.files[0])}
                  name="pic"
                  id="custom-file"
                  placeholder="Upload profile pic"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          you have an Account ? <Link to="/login">Login Here</Link>
        </div>
      </section>
    </MainScreen>
  );
};

export default RegisterScreen;
