import { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";

const router: Router = Router();

type TUser = {
  name: string;
  todos: string[];
};

const dataFile = path.join(process.cwd(), "data.json");
let users: TUser[] = [];

fs.readFile(dataFile, "utf8", (err, data) => {
  if (err) {
    if (err.code === "ENOENT") {
      fs.writeFile(dataFile, JSON.stringify([]), (err) => {
        if (err) console.error("Error creating data.json:", err);
      });
    } else {
      console.error("Error reading data.json:", err);
    }
    users = [];
    return;
  }

  try {
    users = JSON.parse(data) as TUser[];
  } catch (error: any) {
    console.error(`Error parsing JSON: ${error}`);
    users = [];
  }
});

function saveUsers() {
  fs.writeFile(dataFile, JSON.stringify(users, null, 2), (err) => {
    if (err) console.error("Error writing data.json:", err);
  });
}

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

router.delete("/delete", (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const normalizedName = name.trim().toLowerCase();

  const userIndex = users.findIndex((u) => u.name.toLowerCase() === normalizedName);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  res.json({ message: "User deleted successfully." });
});

router.put("/update", (req: Request, res: Response) => {
  const { name, todo } = req.body;

  if (!name || !todo) {
    return res.status(400).json({ message: "Name and todo are required" });
  }

  const normalizedName = name.trim().toLowerCase();

  const user = users.find((u) => u.name.toLowerCase() === normalizedName);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const todoIndex = user.todos.indexOf(todo);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  user.todos.splice(todoIndex, 1);
  saveUsers();
  res.json({ message: "Todo deleted successfully." });
});

export default router;