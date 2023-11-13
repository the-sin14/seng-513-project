import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    // get all users
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "OK",
            users,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "Error",
        });
    }
};
export const userSignUp = async (req, res, next) => {
    // user will sign up
    try {
        const { name, email, password } = req.body;
        // Checking whether this email already exists in the database or not.
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("Email already exists.");
        }
        // hasing the password so that it becomes very hard to decrypt.
        const saltedPasswrd = await hash(password, 10);
        const user = new User({ name, email, password: saltedPasswrd });
        await user.save();
        // create token and store cookie.
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const twoWeeks = "2w";
        const token = createToken(user._id.toString(), user.email, twoWeeks);
        const expires = new Date();
        expires.setDate(expires.getDate() + 14);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        // post is successful
        return res.status(201).json({
            message: "OK",
            name: user.name, email: user.email
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "An error occurred during sign up",
            error: error.message,
        });
    }
};
export const userLogin = async (req, res, next) => {
    // user will login
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Email not registered");
        }
        const isPasswordCorrect = await compare(password, user.password); // Inside the user we have the encrypted password
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password");
        }
        // removes the previous cookie and set the current one.
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        // create a new token
        const twoWeeks = "2w";
        const token = createToken(user._id.toString(), user.email, twoWeeks);
        const expires = new Date();
        expires.setDate(expires.getDate() + 14);
        // Need to change the name of the domain when we deploy to somewhere.
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).send({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "An error occurred during login",
            error: error.message,
        });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token invalid");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map