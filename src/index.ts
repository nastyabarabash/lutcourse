import { Request, Response, Router } from "express";
// import fs from "fs";

const router: Router = Router();

type TUser = {
  name: string;
  todos: string[];
}

let users: TUser[] = [];

router.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

// router.get("/hello", (req: Request, res: Response) => {
//   res.json({ msg: "Hello world!" });
// });

// router.get("/echo/:id", (req: Request, res: Response) => {
//   res.json({ id: req.params.id });
// });

router.post("/add", (req: Request, res: Response) => {
  const { name, todo } = req.body;

  if (!name || !todo) {
    return res.status(400).json({ error: "Name and todo are required" });
  }

  let user = users.find((u) => u.name === name);

  if (user) {
    user.todos.push(todo);
  } else {
    users.push({ name, todos: [todo] });
  }

  res.json({ message: `Todo added successfully for user ${name}.` });
});

export default router;