import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ejs from "ejs";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);

app.listen(process.env.PORT, () =>
  console.log(`app running on: ${process.env.PORT}`)
);
