import { json } from "express";
import jwt from "jsonwebtoken";
import userModel from "../model/users.model.js";

    
function verifyToken(req, res, next) {

    if(req.headers && 
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
    jwt.verify(
        req.headers.authorization.split(" ")[1],
        "secretKey",
        function(err, verifiedToken) {

            console.log("verified Token", verifiedToken);
            if (err) {
               res.status(401).json({message: err.message || "Invalid JWT Token"});
            }

            // if (verifiedToken.exp) {

            // }

            userModel.findById(verifiedToken._id)
                .then(user => {
                    req.user = user;
                    next();
                }).catch(err => {
                    res.status(500).json({message: err.message || "server not available"});
                })
        }
    )
} else {
    res.status(403).json({message: "Token not present"});
}
}

export default verifyToken;