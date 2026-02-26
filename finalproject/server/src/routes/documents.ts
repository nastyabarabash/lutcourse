import express, { Request, Response } from "express"
import Document from "../models/Document"
import { authMiddleware } from "../middleware/auth"

const router = express.Router()

interface AuthRequest extends Request {
  user?: any
}

router.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { title, content } = req.body

      const doc = new Document({
        title,
        content,
        owner: req.user.id
      })

      await doc.save()
      res.status(201).json(doc)
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  }
)

router.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const docs = await Document.find({ owner: req.user.id })
      res.json(docs)
    } catch {
      res.status(500).json({ message: "Server error" })
    }
  }
)

router.put(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const doc = await Document.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        req.body,
        { new: true }
      )

      if (!doc) {
        return res.status(404).json({ message: "Document not found" })
      }

      res.json(doc)
    } catch {
      res.status(500).json({ message: "Server error" })
    }
  }
)

router.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const doc = await Document.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id
      })

      if (!doc) {
        return res.status(404).json({ message: "Document not found" })
      }

      res.json({ message: "Deleted" })
    } catch {
      res.status(500).json({ message: "Server error" })
    }
  }
)

export default router