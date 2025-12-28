import { Request, Response, Router } from "express";
import { body, Result, ValidationError, validationResult } from "express-validator"
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken"
// import { v4 as uuidv4 } from "uuid"
import { User, IUser } from "../models/User";
import { validateToken } from "../middleware/validateToken"
import { emailValidator, usernameValidator, passwordRegisterValidator, passwordLoginValidator } from "../validators/inputValidation"

const router: Router = Router();
// const users: { id: string; email: string; password: string }[] = []
// const generateId = () =>
//   Math.random().toString(36).substring(2) + Date.now().toString(36)


router.post("/user/register", 
  emailValidator,
  usernameValidator,
  passwordRegisterValidator,
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req)
    // const { email, password, username } = req.body

    if(!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const existingUser: IUser | null = await User.findOne({ email: req.body.email })
      console.log(existingUser)

      if (existingUser) {
        return res.status(403).json({ error: "Email already in use." })
      }

      const salt: string = bcrypt.genSaltSync(10)
      const hash: string = bcrypt.hashSync(req.body.password, salt)
      const newUser = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        isAdmin: true,
      })
      // return res.status(200).json({ id: user._id, email: user.email, username: user.username })
      return res.status(200).json(newUser)

    } catch (error: any) {
      // if (error.code === 11000) { 
      //   return res.status(403).json({ error: "email already in use" })
      // }
      console.log("Error during registration:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }
)

router.post("/user/login",
  emailValidator,
  passwordLoginValidator, 
  async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Missing email or password" })
    }

    try {
      const user: IUser | null = await User.findOne({email: req.body.email})

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const jwtPayload: JwtPayload = {
          _id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
        }
        const JWT_SECRET = process.env.SECRET || "test_secret";
        const token: string = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "2h" })
        return res.status(200).json({success: true, token})
      }
      return res.status(401).json({ error: "Invalid password" })
    } catch (error: any) {
      console.error(`Error during user login: ${error}`)
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
)

router.get("/user/list", validateToken, async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find()
    return res.status(200).json(users)

  } catch (error: any) {
    console.error(`Error while fetching users: ${error}`)
    return res.status(500).json({error: "Internal Server Error"})
  }
})

// router.post("/user/register", (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Missing email or password" });
//   }

//   const normalizedEmail = email.trim().toLowerCase();
//   const existingUser = users.find(user => user.email === normalizedEmail);

//   if (existingUser) {
//     return res.status(403).json({ error: "email already in use" });
//   }

//   const hash = bcrypt.hashSync(password, 10);

//   const newUser = {
//     id: generateId(),
//     email: normalizedEmail,
//     password: hash
//   };

//   users.push(newUser);

//   return res.status(200).json(newUser);
// });

// router.post("/user/login", (req: Request, res: Response) => {
//   const { email, password } = req.body || {};

//   if (!email || !password) {
//     return res.status(400).json({ error: "Missing email or password" });
//   }

//   const normalizedEmail = email.trim().toLowerCase();
//   const user = users.find(u => u.email.toLowerCase() === normalizedEmail);

//   if (!user) {
//     return res.status(403).json({ error: "Login failed." });
//   }

//   const passwordMatches = bcrypt.compareSync(password, user.password);
//   if (!passwordMatches) {
//     return res.status(401).json({ error: "Login failed." });
//   }

//   const JWT_SECRET = process.env.SECRET || "test_secret";
//   const payload: JwtPayload = { email: email };

//   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2m" });

//   return res.status(200).json({ success: true, token });
// });


// router.get("/user/list", (req: Request, res: Response) => {
//   return res.status(200).json(users)
// })

// router.get("/private", validateToken, (req, res) => {
//   return res.status(200).json({ message: "This is protected secure route!" });
// });

export default router