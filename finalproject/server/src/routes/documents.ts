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
      console.error("Documents route error:", error)
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
    } catch (error) {
      console.error("Documents route error:", error)
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
    } catch (error) {
      console.error("Documents route error:", error)
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
    } catch (error) {
      console.error("Documents route error:", error)
      res.status(500).json({ message: "Server error" })
    }
  }
)

router.get("/public/:shareId", async (req: Request, res: Response) => {
  try {
    const shareId = req.params.shareId
    if (!shareId) {
      return res.status(400).json({ message: "Share ID required" })
    }
    
    const doc = await Document.findOne({
      shareId,
      isPublic: true
    })

    if (!doc) {
      return res.status(404).json({ message: "Document not found" })
    }

    res.json({
      title: doc.title,
      content: doc.content,
      createdAt: doc.createdAt
    })
  } catch (error) {
    console.error("Documents route error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

router.patch("/:id/share", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const doc = await Document.findOne({
      _id: req.params.id,
      owner: req.user?.id
    })

    if (!doc) {
      return res.status(404).json({ message: "Document not found" })
    }

    doc.isPublic = !doc.isPublic
    await doc.save()

    res.json({
      message: "Share status updated",
      isPublic: doc.isPublic,
      shareLink: doc.isPublic
        ? `http://localhost:5000/api/documents/public/${doc.shareId}`
        : null
    })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
})

export default router