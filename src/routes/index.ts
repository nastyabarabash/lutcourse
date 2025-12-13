import { Request, Response, Router } from "express";
import { Image, IImage } from "../models/Image";
import { Offer } from "../models/Offer";
import upload from "../middleware/multer-config"

const router: Router = Router();

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const { title, description, price } = body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const offerData: any = { 
      title, 
      description, 
      price: Number(price) 
    };

    if (req.file) {
      const image: IImage = new Image({
        filename: req.file.filename,
        path: `/images/${req.file.filename}`,
      });
      await image.save();

      offerData.imageId = image._id;
    }

    const offer = new Offer(offerData);
    await offer.save();

    return res.status(201).json({ message: "Offer saved successfully", offer });
  } catch (error) {
    console.error("Error saving offer:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/offers", async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find().lean();
    const result = await Promise.all(
      offers.map(async (offer) => {
        let imagePath = null;
        if (offer.imageId) {
          const image = await Image.findById(offer.imageId).lean();
          if (image) imagePath = image.path;
        }
        return {
          title: offer.title,
          description: offer.description,
          price: offer.price,
          imagePath,
        };
      })
    );
    res.json(result);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;