import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
import itemRoutes from "./itemRoutes.js";
const appRouter = Router();
appRouter.use("/user", userRoutes);
appRouter.use("/chat", chatRoutes);
appRouter.use("/items", itemRoutes);
//const itemsRouter = require("./routes/items");
//app.use("/api/v1/items", itemsRouter);
export default appRouter;
//# sourceMappingURL=index.js.map