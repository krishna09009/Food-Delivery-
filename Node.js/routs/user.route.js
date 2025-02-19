import { logIn, register, } from "../controller/user.controller.js";

export function userROute(app){
     app.post("/api/register/",register);
     app.post("/api/login",logIn);
}
