import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_VERIFY_FAIL,USER_LOGIN_SUCCESS,USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_SUCCESS,USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_VERIFY_REQUEST, USER_VERIFY_SUCCESS} from '../constants/userConstant';
import axios from 'axios';


export const login = (email,password) => async(dispatch) =>{
     try {

        dispatch({type:USER_LOGIN_REQUEST});


            const config = {
                Headers : {
                    "Content-type":"applications/json"
                },
            };


            
                const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`,{
                    email,password
                },config);


                dispatch({type:  USER_LOGIN_SUCCESS, payload:data});

            localStorage.setItem("userInfo",JSON.stringify(data));

            

        } catch (error) {

            dispatch({type: USER_LOGIN_FAIL,payload:error.response && error.response.data.message
                ? error.response.data.message
                :error.message,
            });
   
    }
};


    export const logout =() => async (dispatch)=>{
        localStorage.removeItem("userInfo");
        dispatch({type:USER_LOGOUT});
    };

    export const register = (name,email,password,pic) => async(dispatch) =>{
        try {
            dispatch({type:USER_REGISTER_REQUEST});

             const config = {
                Headers : {
                    "Content-type":"applications/json"
                },
            };

              const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users`,{
                name,email,password,pic
            },config);
            
            dispatch({type:USER_REGISTER_SUCCESS,payload:data});

            dispatch({type:USER_LOGIN_SUCCESS,payload:data});

            localStorage.setItem("userInfo",JSON.stringify(data));

        } catch (error) {
           dispatch({
               type:USER_REGISTER_FAIL,
               payload:
               error.response && error.response.data.message

               ? error.response.data.message
               :error.message,
           }); 
        }
    };


    //verification

export const verfication = ( userId,otp) => async(dispatch) =>{
        try {
            dispatch({type:USER_VERIFY_REQUEST});

             const config = {
                Headers : {
                    "Content-type":"applications/json"
                },
            };

              const {data} = await axios.post( `${process.env.REACT_APP_SERVER_URL}/api/users/verify-email`,{
                userId,otp
            },config);
            
            dispatch({type:USER_VERIFY_SUCCESS,payload:data});

            dispatch({type:USER_LOGIN_SUCCESS,payload:data});

            localStorage.setItem("userInfo",JSON.stringify(data));

        } catch (error) {
           dispatch({
               type:USER_VERIFY_FAIL,
               payload:
               error.response && error.response.data.message

               ? error.response.data.message
               :error.message,
           }); 
        }
    };



    //update profile

    export const updateProfile = (user) => async(dispatch,getState) =>{        
        try {
            dispatch({type:USER_UPDATE_REQUEST});
            
            const {
                userLogin : {userInfo},
            } = getState();


             const config = {
                headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`,
                },
            };

              const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/profile`,user,config);

            dispatch({type:USER_UPDATE_SUCCESS,payload:data});

            //all of the data updated the user updated its profile
            dispatch({type:USER_LOGIN_SUCCESS,payload:data});
            //then store in the localstorage
            localStorage.setItem("userInfo",JSON.stringify(data));

        } catch (error) {
           dispatch({
               type:USER_UPDATE_FAIL,
               payload:
               error.response && error.response.data.message

               ? error.response.data.message
               :error.message,
           }); 
        }
    };