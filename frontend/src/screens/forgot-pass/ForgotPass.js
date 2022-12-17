import React,{useState,useEffect} from "react";
import axios from "axios";
import ChangePass from "./ChangePass";


const ForgotPass = () => {

const [email,setEmail] = useState("");
const[otpForm,showForm] = useState(true);



const submitHandler = async(e) =>{
 e.preventDefault();
 
try {
      const config = {
        Headers: {
          "Content-type": "applications/json",
        },
      };

      const { data } = await axios.post(
        `/api/users/forgot`,
        {
          email,
        },
        config
      );

       console.log(data.message);
       showForm(false);
    //  setSuccess(data.message);
    //   setError("");

    } catch (error) {
        console.log(error.response.data.message);
        //  setError(error.response.data.message);
    }




 }


  return (
    <>
      {
        otpForm ? 
        <div
        style={{
          marginTop: "8rem",
        }}
      >
        <h1>Forgot Pass</h1>

        <form onSubmit={submitHandler}>
          <input
          type="email"
          placeholder="Enter the email"
          value={email}
           onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "300px",
            height: "50px",
            margin: "10px",
          }}
        />

        <button type="submit">submit</button>
        </form>
      </div>

      : <ChangePass email={email}/>
      }
    </>
  );
};

export default ForgotPass;
