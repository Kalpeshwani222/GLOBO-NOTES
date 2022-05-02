const express = require("express");
const {registerUser,authUser,updateUserProfile,verifyEmail } = require('../controllers/userControllers');
const { protect } = require("../middlewares/authMiddleWare");

const router = express.Router();

//for register route
router.route('/').post(registerUser);

//for login route
router.route('/login').post(authUser );

//for verify email
router.route('/verify-email').post(verifyEmail );

//for userProfile
router.route("/profile").post(protect,updateUserProfile)


module.exports = router;