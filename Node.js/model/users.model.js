import { json } from "express";
import mongoose from "mongoose";

const userSchemna = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String
});

const userModel = mongoose.model("users",userSchemna);

export default userModel;