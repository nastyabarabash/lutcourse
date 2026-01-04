import { Request, Response, Router } from "express";
import { Topic } from "../models/Topic";
import { validateUser, validateAdmin } from "../middleware/validateToken"

const router: Router = Router();

router.get("/topics", async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.find()
    return res.status(200).json(topics)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.post(
  "/topic",
  validateUser,
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const newTopic = await Topic.create({
        title: req.body.title,
        content: req.body.content,
        username: req.user.username,
      })

      return res.status(200).json(newTopic)
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  }
)

router.delete(
  "/topic/:id",
  validateAdmin,
  async (req: Request, res: Response) => {
    try {
      await Topic.findByIdAndDelete(req.params.id)
      return res
        .status(200)
        .json({ message: "Topic deleted successfully." })
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  }
)

export default router