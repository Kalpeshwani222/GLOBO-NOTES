import React,{useState,useEffect} from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { register } from "../../actions/userActions";

import {
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
  CircularProgress

} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const RegisterScreen = () => {

    const[email,setEmail] = useState("");
    const[name,setName] = useState("");
    const[pic,setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    
    const[password,setPassword] = useState("");

    const[confirmpassword,setConfirmPassword] = useState("");
    
    const[message,setMessage] = useState(null);
    const[picMessage,setPicMessage] = useState(null);


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
    // <MainScreen title="Register">
    //   <section className="register_page">
    //     <div className="container">
    //       {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
         
    //        {loading && <Loading />}
    //       {
    //           message && <ErrorMessage variant="danger">{message}</ErrorMessage>
    //       }
    //       <form className="mt-5" onSubmit={submitHandler} >
    //         <div className="row">


    //           <div className="mb-3 col-lg-12 col-md-12 col-12 col-lg-6 col-md-6 col-12">
    //             <label for="exampleFormControlInput1" className="form-label">
    //                 Name
    //             </label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //               name="name"
    //               placeholder="Enter name"
    //             />
    //           </div>


                
    //           <div className="mb-3 col-lg-12 col-md-12 col-12 col-lg-6 col-md-6 col-12">
    //             <label for="exampleFormControlInput1" className="form-label">
    //                Enter Email
    //             </label>
    //             <input
    //               type="email"
    //               className="form-control"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               name="email"
    //               placeholder="Enter Email"
    //             />
    //           </div>


    //             <div className="mb-3 col-lg-12 col-md-12 col-12">
    //             <label for="exampleFormControlInput1" className="form-label">
    //              Password
    //             </label>
    //             <input
    //               type="password"
    //               className="form-control"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               name="password"
    //               id="exampleFormControlInput1475"
    //               placeholder="***************"
    //             />
    //           </div>

              


    //            <div className="mb-3 col-lg-12 col-md-12 col-12">
    //             <label for="exampleFormControlInput1" className="form-label">
    //              Confirm Password
    //             </label>
    //             <input
    //               type="password"
    //               className="form-control"
    //               value={confirmpassword}
    //               onChange={(e) => setConfirmPassword(e.target.value)}
    //               name="confirmpassword"
    //               id="exampleFormControlInput1"
    //               placeholder="***************"
    //             />
    //           </div>


    //         {picMessage && (
    //             <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
    //         )}

    //            <div className="mb-3 col-lg-12 col-md-12 col-12">
    //             <label for="exampleFormControlInput1" className="form-label">
    //               Profile Picture
    //             </label>
    //             <input
    //               type="file"
    //               className="form-control"
    //             //   value={password}
    //               onChange={(e) => postDetails(e.target.files[0])}
    //               name="pic"
    //               id="custom-file"
    //               placeholder="Upload profile pic"
    //             />
    //           </div>

    //           <button type="submit" className="btn btn-primary">
    //             Submit
    //           </button>
    //         </div>
    //       </form>
    //       you have an Account ? <Link to="/login">Login Here</Link>
    //     </div>
    //   </section>
    // </MainScreen>


     <section>
                
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                 {
               message && <ErrorMessage variant="danger">{message}</ErrorMessage>
           }
                  <div>
                    <ThemeProvider theme={theme}>
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
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
                  label="Enter Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                />

                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Enter confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="cpassword"
                />

                 {picMessage && (
                 <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
             )}

             <input
                  type="file"
                  className="form-control"
                //   value={password}
                  onChange={(e) => postDetails(e.target.files[0])}
                  name="pic"
                  id="custom-file"
                  placeholder="Upload profile pic"
                />
             

                {loading ? (
                  <CircularProgress justify="center" />
                  
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                )}

                <Grid container>
                  <Grid item xs>
                    
                    <Link variant="body2" to="/reset-password">
                      Forgot password?
                    </Link>

                  </Grid>
                  <Grid item>
                    <Link href="body2" to="/register">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
                  </div>
                </section>
  );
};

export default RegisterScreen;
