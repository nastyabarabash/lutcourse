import { Request, Response, Router } from "express";
import { User } from "./models/User";
import populateUsers from "../data/users";

const router: Router = Router();

router.get("/users", (req: Request, res: Response) => {
  // res.json(users);
});

// router.post("/add", (req: Request, res: Response) => {
//   const { name, todo } = req.body;

//   if (!name || !todo) {
//     return res.status(400).json({ error: "Name and todo are required" });
//   }

//   const normalizedName = name.trim().toLowerCase();

//   let user = users.find((u) => u.name.toLowerCase() === normalizedName);

//   if (user) {
//     user.todos.push(todo);
//   } else {
//     user = { name: name.trim(), todos: [todo] };
//     users.push(user);
//   }

//   res.json({ message: `Todo added successfully for user ${user.name}.` });
// });

// router.get("/todos/:id", (req: Request, res: Response) => {
//   const name = req.params.id;

//   if (!name) {
//     return res.status(400).json({ message: "Name is required" });
//   }

//   const normalizedName = name.trim().toLowerCase();

//   const user = users.find((u) => u.name.toLowerCase() === normalizedName);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json({ name: user.name, todos: user.todos });
// });

// router.delete("/delete", (req: Request, res: Response) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "Name is required" });
//   }

//   const normalizedName = name.trim().toLowerCase();

//   const userIndex = users.findIndex((u) => u.name.toLowerCase() === normalizedName);

//   if (userIndex === -1) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   users.splice(userIndex, 1);

//   res.json({ message: "User deleted successfully." });
// });

// router.put("/update", (req: Request, res: Response) => {
//   const { name, todo } = req.body;

//   if (!name || !todo) {
//     return res.status(400).json({ message: "Name and todo are required" });
//   }

//   const normalizedName = name.trim().toLowerCase();

//   const user = users.find((u) => u.name.toLowerCase() === normalizedName);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const todoIndex = user.todos.indexOf(todo);
//   if (todoIndex === -1) {
//     return res.status(404).json({ message: "Todo not found" });
//   }

//   user.todos.splice(todoIndex, 1);

//   res.json({ message: "Todo deleted successfully." });
// });

// router.get("/api/users/populate", async (req: Request, res: Response) => {
//   for (let i = 0; i < populateUsers.length; i++) {
//     const entry = populateUsers[i];
//     if (!entry) continue;
  
//     const user = new User({
//       name: entry.name
//     });
  
//     await user.save();  
//   }
//   console.log("Database populated")
//   res.json({message: "database populated"})
// }) 

router.post("/add", async (req: Request, res: Response) => {
  const { name, todo } = req.body;

  if (!name || !todo) {
    return res.status(400).json({ message: "Missing name or todo" });
  }

  try {
    // find or create user
    let user = await User.findOne({ name });

    if (!user) {
      user = new User({ name, todos: [] });
    }

    // push new todo
    user.todos.push({ todo });

    await user.save();

    res.json({ message: "Todo added", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;