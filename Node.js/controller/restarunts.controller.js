import mongoose from "mongoose";
import restaruntModel from "../model/restarunts.model.js"
export   function create(req,res){


    const {name,rating,offer,delivaryTime,food,locaton,imgId}=req.body //took date from 
    const newRestarunt = new restaruntModel({
        name,rating,offer,delivaryTime,food,imgId,locaton  ///new row using restarunt model
    });
    newRestarunt.save().then(data=>{  //save() is asyn it returns a promise and the promise is resloved by then()
        if(!data){
            res.status(400).send("something went wrong");
        }
        res.json(data);

    }).catch(err=> res.status(500).json({message:err.message}));
}


export function fetch(req,res){
    restaruntModel.find().then(data =>{ 
        if(!data){
            res.status(404).json({message:"data not found"});
        }
        res.json(data);
    }).catch(err=>res.status(500).json({message:err.message}))
}

export function fetchOne(req,res){

    const _id = req.params.id;

    restaruntModel.findById(_id).then(data =>{
        if(!data){
            res.status(404).json({message:"data not found"});
        }
        res.json(data);
    }).catch(err=>res.status(500).json({message:err.message}))
}

export function updateOne(req,res){

    const _id = req.params.id;

    restaruntModel.findByIdAndUpdate(_id,{rating:5}).then(data =>{
        if(!data){
            res.status(404).json({message:"data not found"});
        }
        res.json(data);
    }).catch(err=>res.status(500).json({message:err.message}))
}

export function deleteOne(req,res){

    const _id = req.params.id;

    restaruntModel.findByIdAndDelete(_id).then(data =>{
        if(!data){
            res.status(404).json({message:"data not found"});
        }
        res.json(data);
    }).catch(err=>res.status(500).json({message:err.message}))
}