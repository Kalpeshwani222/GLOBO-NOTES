const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const noteSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },

        category:{
            type:String,
            required:true,
        },
        public : {
            type:Boolean,
            default:false
        },
        
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        
        },
    
    },
    {
        timestamps:true,
    }
);

 const Note = mongoose.model("Note",noteSchema);

 module.exports = Note;

 