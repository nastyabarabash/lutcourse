import { Request, Response, Router } from "express";
import { User, IUser } from "./models/User";
import populateUsers from "../data/users";

const router: Router = Router();

let msg: string[] = [];

router.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users: IUser[] | null = await User.find()
    if (!users) {
      return res.status(404).json({message: "No users found"})
    }
    return res.json(users)
  } catch (error: any) {
    console.log(`Error while fetching users: ${error}`)
    return res.status(500).json({message: "Internal server error"})
  }
});

router.get("/api/user", async (req: Request, res: Response) => {
  try {
    const existingUser: IUser | null = await User.findOne({user: req.body.user})
    if (existingUser) {
      return res.status(403).json({message: "User already exists"})
    }

    const user: IUser = new User ({
      name: req.body.name,
      todos: req.body.todos
    })
    await user.save()
    console.log("User saved!")
    return res.status(201).json({message: "User saved succesfully"})
  } catch (error: any) {
    console.log(`Error while saving user: ${error}`)
    return res.status(500).json({message: "Internal server error"})
  }
});

// router.get("/users", (req: Request, res: Response) => {
//   res.json({});
// });

router.post("/add", async (req: Request, res: Response) => {
  const { name, todo, checked } = req.body;

  if (!name || !todo) {
    return res.status(400).json({ message: "Missing name or todo" });
  }

  try {
    let user = await User.findOne({
      name: { $regex: `^${name}$`, $options: "i" }
    });

    if (!user) {
      user = new User({ name, todos: [] });
    }

    user.todos.push({ todo, checked: checked ?? false });

    await user.save();

    res.json({ message: "Todo added", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/api/users/populate", async (req: Request, res: Response) => {
  for (let i = 0; i < populateUsers.length; i++) {
    const entry = populateUsers[i];
    if (!entry) continue;
  
    const user = new User({
      name: entry.name
    });
  
    await user.save();  
  }
  console.log("Database populated")
  res.json({message: "database populated"})
}) 

router.get("/todos/:name", async (req: Request, res: Response) => {
  try {
    const userName = req.params.name;
    if (!userName) {
      return res.status(400).json({ message: "User name is required" });
    }

    const user: IUser | null = await User.findOne({
      name: { $regex: new RegExp(`^${userName}$`, "i") }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateTodo", async (req: Request, res: Response) => {
  try {
    const { name, todo } = req.body;

    if (!name || !todo) {
      return res.status(400).json({ message: "Missing name or todo" });
    }

    const user = await User.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const originalLength = user.todos.length;
    user.todos = user.todos.filter((t) => t.todo !== todo);

    if (user.todos.length === originalLength) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await user.save();

    res.json({ message: "Todo deleted successfully." });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;