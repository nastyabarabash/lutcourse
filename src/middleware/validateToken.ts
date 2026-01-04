import { Request, Response, NextFunction, response } from "express"
import jwt, {JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

interface CustomRequest extends Request {
  user?: CustomJwtPayload
}

interface CustomJwtPayload extends JwtPayload {
  _id: string
  username: string
  isAdmin: boolean
}

export const validateUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('authorization')?.split(" ")[1]

  if(!token) return res.status(401).json({ message: "Token not found." })

  try {
    const verified: CustomJwtPayload = jwt.verify(token, process.env.SECRET || "test_secret") as CustomJwtPayload
    req.user = verified
    next()
  } catch (error: any) {
    return res.status(401).json({ message: "Token not found." })
  }
}

export const validateAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('authorization')?.split(" ")[1]

  if(!token) return res.status(403).json({ message: "Access denied." })

  try {
    const verified: CustomJwtPayload = jwt.verify(token, process.env.SECRET || "test_secret") as CustomJwtPayload
    if (!verified.isAdmin) {
      return res.status(403).json({ message: "Access denied." })
    }
    req.user = verified
    next()
  } catch (error: any) {
    return res.status(403).json({ message: "Access denied." })
  }
}