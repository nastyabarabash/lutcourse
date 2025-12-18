import { Request, Response, Router } from "express";
import { body, Result, ValidationError, validationResult } from "express-validator"
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken"
import { User, IUser } from "../models/User";
import { validateToken } from "../middleware/validateToken"

const router: Router = Router();

router.post("/register", 
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 4 }).trim(), 
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req)

    if(!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({errors: errors.array()})
    }
    try {
      const existingUser: IUser | null = await User.findOne({email: req.body.email})
      console.log(existingUser)
      if (existingUser) {
        return res.status(403).json({error: "email already in use"})
      }

      const salt: string = bcrypt.genSaltSync(10)
      const hash: string = bcrypt.hashSync(req.body.password, salt)
      const user = await User.create({
        email: req.body.email,
        password: hash
      })
      return res.status(200).json({email: user.email, password: user.password})

    } catch (error: any) {
      if (error.code === 11000) { 
        return res.status(403).json({ error: "email already in use" })
      }
      console.log("Error during registration:", error)
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
)

router.post("/login",
  body("email").isEmail(),
  body("password").notEmpty(), 
  async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Missing email or password" })
    }

    try {
      const user: IUser | null = await User.findOne({email: req.body.email})

      if (!user) {
        return res.status(403).json({error: "Login failed."})
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const jwtPayload: JwtPayload = {
          id: user._id,
          email: user.email
        }
        const token: string = jwt.sign(jwtPayload, process.env.SECRET as string, { expiresIn: "2m" })
        return res.status(200).json({success: true, token})
      }

      return res.status(401).json({error: "Login failed."})
    } catch (error: any) {
      console.error(`Error during user login: ${error}`)
      return res.status(500).json({error: "Internal Server Error"})
    }
  }

)

router.get("/list", validateToken, async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find()
    return res.status(200).json(users)

  } catch (error: any) {
    console.error(`Error while fetching users: ${error}`)
    return res.status(500).json({error: "Internal Server Error"})
  }
})

export default router