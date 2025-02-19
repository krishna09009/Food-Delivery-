import userModel from "../model/users.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";






export function register(req,res){
    const {fullName,email,password} = req.body;

    const newUser = new userModel({
        email, fullName,password:bcrypt.hashSync(password,10)
    });


    userModel.findOne({email}).then(data =>{
        if(data){
            return res.status(400).json({message:"User already exists"})
        }else{
            newUser.save().then(data =>{
                if(!data){
                    return res.status(400).json({message:"something went wrong"})
                } 
                return res.status(200).json({message:"user data added successfully"})
            })
        }
    }).catch((err)=>{
        res.status(500).json({message:err.message})
    })
    
  
}



export function logIn(req,res){
    const {email,password}=req.body;

    userModel.findOne({email}).then(data =>{
        if(!data){
            res.status(404).json({message:"user is not registerd"});
        }

    
        
        let isValidPassowrd = bcrypt.compareSync(password,data.password);//.compareSync will compare the enterd password and encrypted password
        if(!isValidPassowrd){
            res.status(401).json({message:"invalid email or password"});
        }

        let token = jwt.sign({id:data._id},"secretKey",{expiresIn:"1h"});//using jwt sigin using user info id seareatkey that is 256bit key generally and expirey time optional here it is 1hr

        
        res.json({
            user:{
                email:data.email,
                password:data.password
            },
            accesToken:token
        })
    }).catch((err)=>{
        res.status(500).json({message:err.message})
    })


}
