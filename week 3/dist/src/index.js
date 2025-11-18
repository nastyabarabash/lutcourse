import { Router } from "express";
import fs from "fs";
const router = Router();
let msg = [];
fs.readFile("data/messages.json", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        msg = JSON.parse(data);
    }
    catch (error) {
        console.error(`Error pasing JSON: ${error}`);
    }
});
router.get("/", (req, res) => {
    res.json(msg);
});
router.get("/hello", (req, res) => {
    res.json({ msg: "Hello world!" });
});
router.get("/echo/:id", (req, res) => {
    res.json({ id: req.params.id });
});
router.post("/sum", (req, res) => {
    const numbers = req.body.numbers;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: "numbers must be an array" });
    }
    if (!numbers.every(n => typeof n === "number")) {
        return res.status(400).json({ error: "all elements in numbers must be numbers" });
    }
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    res.json({ sum });
});
export default router;
//# sourceMappingURL=index.js.map