import { Request, Response, Router } from "express"
import * as UserController from "../controller/UserController"
import { body } from "express-validator";

const UserRouter: Router = Router();

// @usage : Get All Users
// @method : GET
// @params : no-params
// @url : http://127.0.0.1:9499/users

UserRouter.get("/", async (request: Request, response: Response) => {
    await UserController.getAllUsers(request, response);
});

// @usage : RegisterUser
// @method : POST
// @params : username, email, password 
// @url : http://127.0.0.1:9499/users/register


UserRouter.post("/register",
    [
        body("username").not().isEmpty().withMessage("User name is required ! 👀"),
        body("email").isEmail().withMessage("Email is required ! 👀"),
        body("password").not().isStrongPassword().withMessage("Password is required ! 👀"),
    ],
    async (request: Request, response: Response) => {
        console.log("User Register");
        await UserController.registerUser(request, response);
    });

// @usage : LoginUser
// @method : POST
// @params : email, password 
// @url : http://127.0.0.1:9499/users/login

UserRouter.post("/login",
    [
        body("email").isEmail().withMessage("Email is required ! 👀"),
        body("password").not().isStrongPassword().withMessage("Password is required ! 👀"),
    ],
    async (request: Request, response: Response) => {
        console.log("User Login");
        await UserController.loginUser(request, response);
    });


export default UserRouter;