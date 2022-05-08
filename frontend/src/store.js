import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension"
import {userLoginReducers, userUpdateReducer,userRegisterReducer,userVerifyReducer} from "./reducers/userReducers";
import {noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer,publicNoteReducer} from "./reducers/NotesReducers"

const reducer = combineReducers({
    userLogin: userLoginReducers,
    userRegister:userRegisterReducer,
    noteList:noteListReducer,
    publicNote: publicNoteReducer,
    noteCreate : noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    userUpdate : userUpdateReducer,
    userVerify : userVerifyReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;


const initialState = {
    userLogin:{userInfo:userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
