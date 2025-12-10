import { Request, Response, Router } from "express";
import { Image } from "../models/Image";
import { Offer } from "../models/Offer";
import upload from "../middleware/multer-config"

const router: Router = Router();

router.post("/upload", upload.single("image"), async (req, res) => {
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
      const img = await Image.create({
        filename: req.file.filename,
        path: `/images/${req.file.filename}`
      });

      offerData.imageId = img._id;
    }

    const offer = new Offer(offerData);
    await offer.save();

    res.status(201).json({ message: "Offer saved successfully", offer });
  } catch (error) {
    console.error("Error saving offer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/api/upload", upload.single("image"), async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const imgPath: string = req.file.path.replace("public", "")

//     const image: IImage = new Image({
//       filename: req.file.filename,
//       path: imgPath
//     })
//     await image.save()
//     console.log("File uploaded and saved in the database")
//     return res.status(201).json({ message: "File uploaded and saved in the database" });
//   } catch (error: any) {
//     console.error(`Error while uploading file:", ${error}`);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

export default router;