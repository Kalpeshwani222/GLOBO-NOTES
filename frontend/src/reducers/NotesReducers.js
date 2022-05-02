import {
  NOTE_LIST_FAIL,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_CREATE_SUCCESS,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAIL,
} from "../constants/NotesConstants";


//getting all the notes 

export const noteListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTE_LIST_REQUEST:
      return { loading: true };

    case NOTE_LIST_SUCCESS:
      return { loading: false, notes: action.payload };

    case NOTE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//create notes reducers

export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_CREATE_REQUEST:
      return { loading: true };

    case NOTE_CREATE_SUCCESS:
      return { loading: false, success: true };

    case NOTE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


//update the notes
export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_UPDATE_REQUEST:
      return { loading: true };

    case NOTE_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case NOTE_UPDATE_FAIL:
      return { loading: false, error: action.payload,success:false };

    default:
      return state;
  }
};


//delete the notes
export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_DELETE_REQUEST:
      return { loading: true };

    case NOTE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case NOTE_DELETE_FAIL:
      return { loading: false, error: action.payload,success:false };

    default:
      return state;
  }
};
