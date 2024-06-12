import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({
        message: "User restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting the user restaurant",
    });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({
        message: "User restaurant already exists",
      });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadedResponse = await cloudinary.v2.uploader.upload(dataURI);

    const newRestaurant = new Restaurant(req.body);
    newRestaurant.imageUrl = uploadedResponse.secure_url;
    newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
    newRestaurant.lastUpdated = new Date();
    await newRestaurant.save();

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while creating the user restaurant",
    });
  }
};

export default {
  getMyRestaurant,
  createMyRestaurant,
};
