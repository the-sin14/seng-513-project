import {Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

/**
 * Middleware for validating Express requests using a set of validation rules.
 * @param validations - Array of validation chains
 * @returns Express middleware function
 */

export const validate = (validations : ValidationChain[]) => {
    return async (req: Request, res:Response, next:NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);       // this is promise
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();                                  // this line goes to the user-controller.ts route.
        } 
        return res.status(422).json({errors: errors.array()});
    }
}

// Checking for validation for name, password and email.

/**
 * Validation rules for user login: email and password.
 */

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is empty which is required!"),
    body("password").trim().isLength({min: 8}).withMessage("Password should contain at least 8 characters")
]

/**
 * Validation rules for user signup: name, email, and password.
 */

export const signupValidator = [
    body("name").notEmpty().withMessage("Name is empty which is required!"),
    ...loginValidator,
]

/**
 * Validation rule for chat message completion: ensuring the message is not empty.
 */

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required!"),
]
