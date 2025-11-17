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
        console.error(`Error pasing JSON: ${error}`);
    }
});
router.get("/hello", (req, res) => {
    res.json({ msg: "Hello world!" });
});
// router.get("/echo/:id", (req: Request, res: Response) => {
//   res.json({ id: req.params.id });
// });
// router.get("/echo/value/:id", (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id);
//   const item = msg[id];
//   if (item === undefined) {
//     return res.status(404).json({ error: "Message not found" });
//   }
//   res.json(item);
// });
// router.get("/echo/:id", (req: Request, res: Response) => {
//   let id: number = parseInt(req.params.id)
//   try {
//     res.json(msg[id])
//   } catch (error: any) {
//     console.error(`Error pasing JSON: ${error}` )
//   }
// })
// router.post("/sum", (req: Request, res: Response) => {
//   let message: string = req.body
//   msg.push(message)
//   fs.writeFile("data/messages.json", JSON.stringify(msg), (err: NodeJS.ErrnoException | null) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     res.json(msg)
//   })
// })
router.post("/sum", (req, res) => {
    const numbers = req.body.numbers;
    // Validate input
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: "numbers must be an array" });
    }
    // Ensure all elements are numbers
    if (!numbers.every(n => typeof n === "number")) {
        return res.status(400).json({ error: "all elements in numbers must be numbers" });
    }
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    res.json({ sum });
});
exports.default = router;
//# sourceMappingURL=index.js.map