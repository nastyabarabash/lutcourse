import { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";

const router: Router = Router();

type TUser = {
  name: string;
  todos: string[];
};

const dataFile = path.join(__dirname, "../data.json");

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

let users: TUser[] = [];

function readUsers(): TUser[] {
  const data = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(data);
}

function writeUsers(users: TUser[]) {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
}

// fs.access(dataFile, (err) => {
//   if (err) {
//     fs.writeFile(dataFile, "[]", () => {});
//   } else {
//     fs.readFile(dataFile, "utf8", (err, data) => {
//       if (!err) {
//         try {
//           users = JSON.parse(data);
//         } catch {
//           users = [];
//         }
//       }
//     });
//   }
// });

// function saveToFile() {
//   fs.writeFile(dataFile, JSON.stringify(users, null, 2), () => {});
// }

// function formatName(name: string) {
//   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
// }

router.get("/users", (req: Request, res: Response) => {
  const users = readUsers();
  res.json(users);
});

router.post("/add", (req: Request, res: Response) => {
  const { name, todo } = req.body;

  if (!name || !todo) {
    return res.status(400).json({ error: "Name and todo are required" });
  }

  const users = readUsers();
  const lower = name.toLowerCase();

  let user = users.find(u => u.name.toLowerCase() === lower);

  if (user) {
    user.todos.push(todo);
  } else {
    const properName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    users.push({ name: properName, todos: [todo] });
  }

  writeUsers(users);

  res.json({ message: `Todo added successfully for user ${name}.` });
});

router.get("/todos/:id", (req: Request, res: Response) => {
  const id = req.params.id ?? "";
  const users = readUsers();

  const user = users.find(u => u.name.toLowerCase() === id.toLowerCase());
  if (!user) return res.json({ message: "User not found" });

  res.json({ name: user.name, todos: user.todos });
});

router.delete("/delete", (req: Request, res: Response) => {
  const { name } = req.body;
  const users = readUsers();

  const filtered = users.filter(u => u.name.toLowerCase() !== name.toLowerCase());

  if (filtered.length === users.length) {
    return res.json({ message: "User not found" });
  }

  writeUsers(filtered);
  res.json({ message: "User deleted successfully." });
});

router.put("/update", (req: Request, res: Response) => {
  const { name, todo } = req.body;
  const users = readUsers();

  const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
  if (!user) return res.json({ message: "User not found" });

  user.todos = user.todos.filter(t => t !== todo);

  writeUsers(users);
  res.json({ message: "Todo deleted successfully." });
});

export default router;