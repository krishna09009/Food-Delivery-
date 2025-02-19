    import mongoose from "mongoose";
    const restaruntSchema = new mongoose.Schema({
        imgId:String,
        name:String,
        rating:String,
        delivaryTim:String, 
        food:String,
        locaton:String,
        offer:String
    });

    const restaruntModel = mongoose.model("restarunts",restaruntSchema);

    export default restaruntModel;