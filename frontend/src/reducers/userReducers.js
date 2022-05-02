import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_VERIFY_FAIL, USER_VERIFY_REQUEST, USER_VERIFY_SUCCESS} from '../constants/userConstant';


export const userLoginReducers = (state = {}, action) =>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true};
        
        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo : action.payload};
        
        case USER_LOGIN_FAIL:
            return {loading:false, error: action.payload};

        case USER_LOGOUT:
            return {};

        default:
            return state;
        
        
    }
}  


//for registering the user reducers

export const userRegisterReducer = (state = {},action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};

        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo:action.payload};

        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload};

        default:
            return state;
    }
}
//verify req

export const userVerifyReducer = (state = {},action) =>{
    switch(action.type){
        case USER_VERIFY_REQUEST:
            return {loading:true};

        case USER_VERIFY_SUCCESS:
            return {loading:false,userInfo:action.payload,success:true};

        case USER_VERIFY_FAIL:
            return {loading:false,error:action.payload};

        default:
            return state;
    }
}



//for profile


export const userUpdateReducer = (state = {},action) =>{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading:true};

        case USER_UPDATE_SUCCESS:
            return {loading:false,userInfo:action.payload,success:true};

        case USER_UPDATE_FAIL:
            return {loading:false,error:action.payload};

        default:
            return state;
    }
} 
