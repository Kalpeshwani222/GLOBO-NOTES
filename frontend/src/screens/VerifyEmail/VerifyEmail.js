import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector } from 'react-redux';
import { verfication } from '../../actions/userActions';
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage";


const VerifyEmail = () => {

  const[otp,setOtp] = useState("");
  
  const dispatch = useDispatch();

  //getting the userId
  const userLogin = useSelector (state => state.userLogin);
  const{userInfo} = userLogin;
  const userId =  userInfo._id;

const userVerify = useSelector(state =>state.userVerify)
const {loading,error,success} = userVerify;


  const submitHandler = async(e) =>{
    e.preventDefault();

    dispatch(verfication(userId,otp));



  // try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     // setLoading(true);

  //     const response = await axios.post(
  //       "/api/users/verify-email",
  //       {
  //        userId,
  //        otp
  //       },
  //       config
  //     );

  //     // if (response.data.statusText == "Success") {
  //     //   toast.success(response.data.message);
        
  //     // } else {
  //     //   toast.error(response.data.message);
  //     //    setLoading(false);
  //     // }
  //   } catch (error) {
  //     // toast.error("Something went wrong");
  //     //  setLoading(false);
  //     console.log(error);
  //   }

}

  return (
    <>
    <form onSubmit={submitHandler}>
    {loading && <Loading />}
    {/* {success && (
              <ErrorMessage variant="success">VerifyEmail successfully</ErrorMessage>
            )} */}

            {error && (<ErrorMessage variant='danger'>{error}</ErrorMessage>)}
     <div style={{maxWidth:"300px"}}>
        <input
                  type="number"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  name="otp"
                  placeholder="Enter OTP"
                />          
     </div>

     <button type="submit" className="btn btn-primary">
                Submit
              </button>
    </form>
    </>
  
  )
}

export default VerifyEmail