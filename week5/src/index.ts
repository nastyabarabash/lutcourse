import { Request, Response, Router } from "express";

const router: Router = Router();

let msg: string[] = [];

router.get("/", (req: Request, res: Response) => {
  res.json({});
});

export default router;