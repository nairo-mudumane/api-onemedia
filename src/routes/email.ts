import { Router } from "express";
import * as controller from "../controllers/email";

const router = Router();

router.post("/send", controller.sendEmail);

export { router as EmailRoutes };
