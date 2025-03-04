import { Request, Response } from "express";
import { IUser } from "../models/IUser";
import dotenv from "dotenv";
import UserTable from "../database/UserSchema";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs"
import gravatar from "gravatar"
import jwt from "jsonwebtoken";

dotenv.config({ path: "./.env" });


// @usage : Get All Users
// @method : GET
// @params : no-params
// @url : http://127.0.0.1:9499/users

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        let theUser: IUser[] | undefined | null = await UserTable.find({ isAdmin: false });

        if (theUser) {
            return response.status(200).json({
                data: theUser,
                msg: "All user found ... ✅"
            });
        }
    } catch (error: any) {
        return response.status(500).json({
            data: null,
            msg: "User not found ... ❌"
        });
    }
}

// @usage : RegisterUser
// @method : POST
// @params : username, email, password 
// @url : http://127.0.0.1:9499/users/register


export const registerUser = async (request: Request, response: Response) => {

    const errors = validationResult(request);

    // express validator error handling

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    try {

        let { username, email, password } = request.body;

        // check for user exists
        const userObj = await UserTable.findOne({ email: email });

        if (userObj) {
            return response.status(400).json({
                error: "The user already exists"
            });
        }

        // password bcryption

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // gravatar url

        const imageUrl = gravatar.url(email, {
            size: "200",
            rating: "pg",
            default: "mm"
        });

        // insert in db

        const newUser: IUser = {
            username: username,
            email: email,
            password: hashPassword,
            imageUrl: imageUrl,
            isAdmin: false
        }

        let theUser: IUser | undefined | null = await new UserTable(newUser).save();

        if (theUser) {
            return response.status(200).json({
                data: theUser,
                msg: "Your Registration Successfully! ✅"
            });
        }

    } catch (error: any) {
        return response.status(500).json({
            data: null,
            error: error.message
        });
    }
}

export const loginUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    try {
        let { email, password } = request.body;

        // check if the user exists

        const userObj = await UserTable.findOne({ email: email });

        if (!userObj) {
            return response.status(500).json({
                data: null,
                error: "invalid Email Address"
            });
        }

        // check for password

        let isMatch: boolean = await bcryptjs.compare(password, userObj.password);

        if (!isMatch) {
            return response.status(500).json({
                data: null,
                error: "Invalid Password!"
            });
        }

        // create token

        const secretKey: string | undefined = process.env.JWT_SECRET_KEY;

        const payload: any = {
            id: userObj.id,
            email: userObj.email
        }


        if (secretKey && payload) {
            jwt.sign(payload, secretKey, { expiresIn: 10000 }, (error, encoded) => {
                if (error) {
                    throw error
                }

                if (encoded) {
                    return response.status(200).json({
                        data: userObj,
                        token: encoded,
                        msg: "Login success! ✅"
                    });
                }
            });
        }


    } catch (error: any) {
        return response.status(500).json({
            error: error.message
        });
    }
}