import { Express } from "express";
import { EmailRoutes } from "./email";

export default function AppRoutes(app: Express) {
  app.use("/email", EmailRoutes);
}
