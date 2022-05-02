 const asyncHandler = require('express-async-handler');
//  const User = require('../models/userModel');
const User = require('../models/userModel');
// const generateToken = require('../utils/generatesToken');
const generateToken = require('../utils/generatesToken');
const { generateOTP, mailTransport } = require('../utils/mail');
//for verification 
const VerificationToken = require('../models/verificationToken');


require("dotenv").config();
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { isValidObjectId } = require('mongoose');
const { is } = require('express/lib/request');


const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);


//for registering the user
const registerUser = asyncHandler(async (req,res) =>{
    
    const { name,email,password,pic} = req.body;   
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }

    const newUser = new User({
        name,email,password,pic
    })

    //otp
    const OTP = generateOTP();
    const vereficationToken = new VerificationToken ({
        owner:newUser._id,
        token: OTP
    })


     await vereficationToken.save();
      const user = await newUser.save();

      transporter.sendMail({
      from: "noreply.newsapplication@gmail.com",
        to: newUser.email,
      subject: "Verify Your Email Account",
      html:`<h1>${OTP}</h1>`
 })

       if(user){
           res.status(201).json({
               _id:user._id,
               name:user.name,
               email:user.email,
               isAdmin:user.isAdmin,
               pic:user.pic,
               token:generateToken(user._id),

           })
       }else{
            res.status(400);
            throw new Error("error Occured");
       }
});



//verify email
const verifyEmail = asyncHandler(async (req,res) =>{
    const {userId,otp} = req.body;

    if(!userId || !otp.trim()) return res.json({message:"missing parameters"});

    //is valid mongodb id or not
    if(!isValidObjectId(userId)) return res.json({message:"invalid UserId"})

   const user = await User.findById(userId)
  
   if(!user) return res.json({message:"sorry user not found"})

   //user is alredy verified 
   if(user.verified) return res.json({message:"account already verified"})

  const token =  await VerificationToken.findOne({owner : user._id})
   if(!token) return res.json({message:"user not found"});


   const isMatched = await token.matchToken(otp)

if(!isMatched) return res.json({message:"Invalid Token"})

//set the user to true is verified user
user.verified = true;

//deleting the toke 
await VerificationToken.findByIdAndDelete(token._id);

const status = await user.save();
    if(status){
         transporter.sendMail({
      from: "noreply.newsapplication@gmail.com",
        to: user.email,
      subject: "Verify Successfully",
      html:`<h1>Email Verified Successfully</h1> <br />
            <h2>Thanks for connecting us</h2>`
 })


 res.status(201).json({
               _id:user._id,
               name:user.name,
               email:user.email,
               pic:user.pic,
              
           })
    }


 
})



//for login the user
const authUser = asyncHandler(async (req,res) =>{
    const { email,password} = req.body;
        
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
             _id:user.id,
               name:user.name,
               email:user.email,
               isAdmin:user.isAdmin,
               pic:user.pic,
               token:generateToken(user._id),
        });
    }else{
            res.status(400);
            throw new Error("Invalid Email and Passwords");
       }
});



//for profile 

const updateUserProfile = asyncHandler(async (req,res) =>{

  const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        user.pic = req.body.pic || user.pic;
        
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        
        res.json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            pic : updatedUser.pic,
            token : generateToken(updatedUser._id),
        });
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})




module.exports={registerUser,authUser,updateUserProfile,verifyEmail};