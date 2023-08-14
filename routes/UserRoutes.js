const express = require("express");
const UserRouter = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_key = process.env.JWT_secret_key;

// ------------Register Route-------------
UserRouter.post("/api/register", async(req,res)=>{
    try {
        const {name, email,  password} = req.body;
        const hashPassword = await bcrypt.hash(password,10)
        const User = new UserModel({name, email, password:hashPassword});
        await User.save()
        res.status(201).json({"message":"User registered successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({"Error":"Error in registering user"})
    }
})

// ------------Login Route----------------
UserRouter.post("/api/login", async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email})
        if(!user) res.status(500).json({"message":"Invalid Credentials"})
        const passMatch = await bcrypt.compare(password, user.password)
        if(!passMatch) res.status(500).json({"message":"Password didn't match"})

        const token = jwt.sign({ user : user._id }, `${jwt_key}`);
        res.status(201).json({"message":"User Logged in Successfully", "token":token})

    } catch (error) {
        console.log(error)
        res.status(500).json({"Error":"Error in logging In"})
    }
})



module.exports = {UserRouter}