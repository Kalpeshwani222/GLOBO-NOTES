import React,{useState} from 'react'
import axios from 'axios';


const ChangePass = (props) => {

const[otpCode,setOtp] = useState("");
const[password,setPassword] =useState("");

const submitHandler = async(e) =>{
     e.preventDefault();
     const email = props.email;

    // alert(props.email);

    try {
      const config = {
        Headers: {
          "Content-type": "applications/json",
        },
      };

      const { data } = await axios.post(
        `/api/users/change-pass`,
        {
         email,otpCode,password
        },
        config
      );

       console.log(data.message);
       
    //  setSuccess(data.message);
    //   setError("");

    } catch (error) {
        console.log(error.response.data.message);
        //  setError(error.response.data.message);
    }
}
  return (
    <>
        
        <div style={{
        marginTop:"6rem"
      }}>
        <h1>OTP form</h1>
          
        <form onSubmit={submitHandler}>
          <input
          type="number"
          maxLength="4"
          placeholder="Enter the OTP"
          value={otpCode}
           onChange={(e) => setOtp(e.target.value)}
          style={{
            width: "300px",
            height: "50px",
            margin: "10px",
          }}
        />

        <input
          type="password"
         
          placeholder="Enter the password"
          value={password}
        onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "300px",
            height: "50px",
            margin: "10px",
          }}
        />

        <button type="submit">Change Password</button>
        </form>
      </div>
    </>
  )
}

export default ChangePass