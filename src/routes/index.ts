import { Request, Response, Router } from "express";
import { Offer } from "../models/Offer";

const router: Router = Router();

router.post("/upload", async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const offer = new Offer({
      title,
      description,
      price
    });

    await offer.save();

    res.status(201).json({ message: "Offer saved successfully", offer });
  } catch (error) {
    console.error("Error saving offer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;