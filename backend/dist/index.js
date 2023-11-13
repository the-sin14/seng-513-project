import app from "./app.js";
import { connectToDatabase } from "./database/connection.js";
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log("Server open and connected to database " + PORT));
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map