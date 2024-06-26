import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";

// Connect with the database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());
// app.use(morgan("dev"));
app.use(morgan("dev"));

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

const PORT = process.env.PORT || 7000;

// Listen
app.listen(PORT, () => {
  console.log(`The server is running on localhost:${PORT}`);
});
