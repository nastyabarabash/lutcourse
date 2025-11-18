import { Request, Response, Router } from "express";
import fs from "fs";

const router: Router = Router();

let msg: string[] = [];

fs.readFile("data/messages.json", "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
  if (err) {
    console.error(err);
    return;
  }
  try {
    msg = JSON.parse(data);
  } catch (error: any) {
    console.error(`Error parsing JSON: ${error}`);
  }
});

router.get("/", (req: Request, res: Response) => {
  res.json(msg);
});

router.get("/hello", (req: Request, res: Response) => {
  res.json({ msg: "Hello world!" });
});

router.get("/echo/:id", (req: Request, res: Response) => {
  res.json({ id: req.params.id });
});

router.post("/sum", (req: Request, res: Response) => {
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