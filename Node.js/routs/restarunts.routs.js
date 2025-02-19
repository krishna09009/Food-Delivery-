//on which route should go to which controller


import { create,deleteOne,fetch, fetchOne, updateOne } from "../controller/restarunts.controller.js";
import verifyToken from "../middleware/verifyToken.js";

export function routes(app){
    app.post("/api/restarunt/",create);
    app.get("/api/restarunts/", verifyToken, fetch);
    app.get("/api/restarunt/:id",fetchOne);
    app.put("/api/restarunt/:id",updateOne);
    app.delete("/api/restarunt/:id",deleteOne);
}