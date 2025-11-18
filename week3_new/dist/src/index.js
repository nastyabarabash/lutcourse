"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
let msg = [];
fs_1.default.readFile("data/messages.json", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        msg = JSON.parse(data);
    }
    catch (error) {
        console.error(`Error parsing JSON: ${error}`);
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
exports.default = router;
//# sourceMappingURL=index.js.map