const express = require('express');

//the complete flow is as follows:   request -> middleware -> controller -> service -> model -> database
//under middleware we can do validation, authentication, authorization, etc.
//controller is where we handle the request and response, and call the service layer for business logic.
//service layer is where we handle the business logic, and call the model layer for database operations.

const authRouter =  express.Router();
const {register, login,logout, adminRegister,deleteProfile,getProfile} = require('../controllers/userAuthent')
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require('../middleware/adminMiddleware');
const { getDashboardStats } = require("../controllers/userDashboard");

// Register
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.post('/admin/register', adminMiddleware ,adminRegister);
authRouter.delete('/deleteProfile',userMiddleware,deleteProfile);
authRouter.get("/dashboard", userMiddleware, getDashboardStats);
authRouter.get('/check',userMiddleware,(req,res)=>{

    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id:req.result._id,
        role:req.result.role,
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})
// authRouter.get('/getProfile',getProfile);
authRouter.get(
    "/profile",
    userMiddleware,
    getProfile
);

module.exports = authRouter;

// login
// logout
// GetProfile

//the complete flow is as follows:   request -> middleware -> controller -> service -> model -> database
//under middleware we can do validation, authentication, authorization, etc.
//controller is where we handle the request and response, and call the service layer for business logic.
//service layer is where we handle the business logic, and call the model layer for database operations.

