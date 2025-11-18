import express from "express";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import router from "./src/index.js";
import morgan from "morgan";
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);
app.listen(port, () => {
    console.log("Hello world!");
});
//# sourceMappingURL=server.js.map