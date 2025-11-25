import { Request, Response, Router } from "express";

const router: Router = Router();

type TUser = {
  name: string;
  todos: string[];
};

let users: TUser[] = [];

router.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

router.post("/add", (req: Request, res: Response) => {
  const { name, todo } = req.body;

  if (!name || !todo) {
    return res.status(400).json({ error: "Name and todo are required" });
  }

  const normalizedName = name.trim().toLowerCase();

  let user = users.find((u) => u.name.toLowerCase() === normalizedName);

  if (user) {
    user.todos.push(todo);
  } else {
    user = { name: name.trim(), todos: [todo] };
    users.push(user);
  }

  res.json({ message: `Todo added successfully for user ${user.name}.` });
});

router.get("/todos/:id", (req: Request, res: Response) => {
  const name = req.params.id;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const normalizedName = name.trim().toLowerCase();

  const user = users.find((u) => u.name.toLowerCase() === normalizedName);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ name: user.name, todos: user.todos });
});

export default router;