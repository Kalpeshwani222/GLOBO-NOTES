const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    code: {
      type: String,
      },
      expireIn:Number,
 
  expireAt:{
    type:Date,
    default:Date.now,
    index:{expires:'1m'}
    
  }
      
 
  },
  // index:    {expireAfterSeconds: 30}
 

);


const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
