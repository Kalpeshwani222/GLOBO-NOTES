const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const verificationTokenSchema = mongoose.Schema(
  {
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    
    token:{
        type:String,
        required:true,
    },

    createdAt:{
        type: Date,
        expires: 3600,
        default: Date.now()
    },

    
    
});


// encrypt token everytime its saved the records
verificationTokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.token = await bcrypt.hash(this.token, salt);
});


//for matching the entered passwords
verificationTokenSchema.methods.matchToken = async function (token) {
  return await bcrypt.compare(token, this.token);
};


const verificationToken = mongoose.model("verificationToken", verificationTokenSchema);

module.exports = verificationToken;
