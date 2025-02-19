

// const express= require("express");
import express from "express";    
import mongoose from "mongoose";
import {routes} from "./routs/restarunts.routs.js"
import { userROute } from "./routs/user.route.js";
import cors from "cors"

const app = express();

app.use(express.json());
 app.use(cors());

    app.listen("3100",()=>{
        console.log("server is running on port 5100");
    });
  
    routes(app);  
    userROute(app); 
 
    mongoose.connect("mongodb+srv://dkushal129:Password1%40@cluster0.pcnj4yo.mongodb.net/");
    //mongodb+srv://dd3160:kushal123@cluster0.zmsuvnz.mongodb.net/

    const db = mongoose.connection;
    db.on("error", ()=>{
        console.log("connection was not successful!!!!");
    });

    db.on("open",()=>{
        console.log("connection is succesful;");

    })


    const users =[
        {id:1,name:"john",age:25},
        {id:2,name:"jane",age:30},
        {id:3,name:"jim",age:35}
    ];

    app.get("/",(req,res)=>{
        res.send("learing node js");
        
    });
  
    
    app.get("/users",(req,res)=>{
        res.send(users);
        
    });

    app.post("/users",(req,res)=>{

        const name = req.body.name;
        const age = req.body.age;


        const user = {
            name : name,
            age : age

        };

        users.push(user);
        res.send(users);
    })




app.put("/user/:id", (req, res) => {
    const id = req.params.id;

    const user = users.find(user => user.id == id);

    if(!user) {
        res.status(404).json({message: "Invalid Id"});
    }

    const keys = Object.keys(req.body);

    keys.forEach(key => {
        if(!user[key]) {
            res.status(404).end({message: "Invalid Key"});
        }

        user[key] = req.body[key];
    });

    res.json(users);
})

app.delete("/user/:id",(req,res)=>{
    const id = req.params.id;

    const user = users.find(user => user.id == id);

    if(!user){
        res.status(404).json("invalid user id");
    }

    const index = users.findIndex(user=>user.id==id);
    users.splice(index,1);
    res.json(users);
})