import { Router } from "express";
import { getAllUsers, userLogin, userSignUp, verifyUser } from "../controllers/user-controller.js";
import { validate, signupValidator, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth", verifyToken, verifyUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map