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

router.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({message: "No user found"})
    }
    return res.json(user)
  } catch (error: any) {
    console.log(`Error while fetching users: ${error}`)
    return res.status(500).json({message: "Internal server error"})
  }
});

router.post("/add", async (req: Request, res: Response) => {
  const { name, todo } = req.body;

  if (!name || !todo) {
    return res.status(400).json({ message: "Missing name or todo" });
  }

  try {
    let user = await User.findOne({ name });

    if (!user) {
      user = new User({ name, todos: [] });
    }

    user.todos.push({ todo });

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

export default router;