import { Request, Response, NextFunction } from "express"
import jwt, {JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

interface AuthRequest extends Request {
  user?: JwtPayload
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header('authorization')?.split(" ")[1]

  if(!token) return res.status(401).json({ message: "Access denied, missing token" })
    
  try {
    const verified: JwtPayload = jwt.verify(token, process.env.SECRET || "test_secret") as JwtPayload
    req.user = verified
    next()
  } catch (error: any) {
    res.status(401).json({ message: "Access denied, missing token" })
  }
}