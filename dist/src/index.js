"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import fs from "fs";
const router = (0, express_1.Router)();
let users = [];
router.get("/users", (req, res) => {
    res.json(users);
});
// router.get("/hello", (req: Request, res: Response) => {
//   res.json({ msg: "Hello world!" });
// });
// router.get("/echo/:id", (req: Request, res: Response) => {
//   res.json({ id: req.params.id });
// });
router.post("/add", (req, res) => {
    const { name, todo } = req.body;
    if (!name || !todo) {
        return res.status(400).json({ error: "Name and todo are required" });
    }
    let user = users.find((u) => u.name === name);
    if (user) {
        user.todos.push(todo);
    }
    else {
        users.push({ name, todos: [todo] });
    }
    res.json({ message: `Todo added successfully for user ${name}.` });
});
exports.default = router;
//# sourceMappingURL=index.js.map