import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req); // this is promise
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next(); // this line goes to the user-controller.ts route.
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
// Checking for validation for name, password and email.
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is empty which is required!"),
    body("password").trim().isLength({ min: 8 }).withMessage("Password should contain at least 8 characters")
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is empty which is required!"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required!"),
];
//# sourceMappingURL=validators.js.map